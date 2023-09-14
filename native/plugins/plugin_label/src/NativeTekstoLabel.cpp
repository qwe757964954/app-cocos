#include "NativeTekstoLabel.h"
#include "cocos.h"
#include "context.h"
#include "cocos/platform/Image.h"

namespace boyaa
{
	static bool SAVE_PNG = false;

	std::shared_ptr<teksto::Context> NativeTekstoLabel::s_shared_context;

	static uint32_t convert_to_cc_color(teksto::Color from)
	{
		uint32_t color = from.a << 24 | from.r << 16 | from.g << 8 | from.b;

		return color;
	}

	const std::shared_ptr<teksto::Context>& NativeTekstoLabel::get_shared_context()
	{
		if (s_shared_context == nullptr)
		{
			s_shared_context = std::make_shared<teksto::Context>();
			s_shared_context->init(true);
		}

		return s_shared_context;
	}


	NativeTekstoLabel::NativeTekstoLabel()
	{
		_layout.reset(new teksto::Layout(get_shared_context()));
	}

	void NativeTekstoLabel::set_html_text(const std::string &text)
	{
		_layout->set_html(text);
	}

	bool NativeTekstoLabel::set_text(const std::vector<teksto::Message>& texts)
	{
		return _layout->set_text(texts);
	}

	void NativeTekstoLabel::measure(int& width, int& height)
	{
		_layout->measure(width, height);
	}

	void NativeTekstoLabel::set_max_lines(int lines)
	{
		_layout->set_max_lines(lines);
	}

	int NativeTekstoLabel::max_lines() const
	{
		return _layout->max_lines();
	}

	// �о�(����)
	bool NativeTekstoLabel::set_line_space(float line_space)
	{
		return _layout->set_line_spacing(line_space);
	}

	float NativeTekstoLabel::line_space() const
	{
		return _layout->line_spacing();
	}
	// ���
	bool NativeTekstoLabel::set_letter_spacing(int letter_spacing)
	{
		return _layout->set_letter_spacing(letter_spacing);
	}
	int NativeTekstoLabel::letter_spacing() const
	{
		return _layout->letter_spacing();
	}

	// ʡ�Ժ�
	char32_t NativeTekstoLabel::ellipsis_char() const
	{
		return _layout->letter_spacing();
	}
	void NativeTekstoLabel::set_ellipsis_char(char32_t ellipsis_char)
	{
		_layout->set_ellipsis_char(ellipsis_char);
	}

	bool NativeTekstoLabel::set_line_truncate_mode(teksto::LineTruncateMode mode)
	{
		return _layout->set_line_truncate_mode(mode);
	}
	teksto::LineTruncateMode NativeTekstoLabel::line_truncate_mode() const
	{
		return _layout->line_truncate_mode();
	}

	bool NativeTekstoLabel::set_horizontal_alignment(teksto::LineAlignment mode)
	{
		return _layout->set_line_alignment(mode);
	}
	teksto::LineAlignment NativeTekstoLabel::horizontal_alignment() const
	{
		return _layout->line_alignment();
	}

	bool NativeTekstoLabel::set_vertical_alignment(teksto::TextAlignment mode)
	{
		return _layout->set_text_alignment(mode);
	}

	teksto::TextAlignment NativeTekstoLabel::vertical_alignment() const
	{
		return _layout->text_alignment();
	}

	bool NativeTekstoLabel::set_layout_alignment(teksto::LayoutAlignment mode)
	{
		return _layout->set_layout_alignment(mode);
	}
	teksto::LayoutAlignment NativeTekstoLabel::layout_alignment() const
	{
		return _layout->layout_alignment();
	}

	void NativeTekstoLabel::display(int& width, int& height)
	{
		_layoutWidth = width;
		_layoutHeight = height;
		doLayout();
		width = _layoutWidth;
		height = _layoutHeight;
	}

	void NativeTekstoLabel::doLayout()
	{
		_childrens.clear();
		_layout->layout(_layoutWidth, _layoutHeight);
		_layout->render(*this);
	}

	void NativeTekstoLabel::render_bitmap(teksto::Bitmap *bitmap, int left, int top, int x_advance, int y_advance)
	{
		_canvas->render_bitmap(bitmap, left, top, x_advance, y_advance);
	}

	void NativeTekstoLabel::render_vector(teksto::VectorType type, int height)
	{
		if (_curChild && _curChild->type == LabelChildType::VECTOR)
		{
			_curChild->x = _flexbox_x + _offset_x;
			_curChild->y = _flexbox_y + _offset_y;
			_curChild->width = _block_width;
			_curChild->height = height;
			_childrens.push_back(std::move(_curChild));
		}
	}

	void NativeTekstoLabel::render_pace_holder(std::string image, int width, int height)
	{
		auto child = std::make_shared<LabelChild>();
		child->type = LabelChildType::PACE_HOLDER;
		child->x = _flexbox_x + _offset_x;
		child->y = _flexbox_y + _offset_y;
		child->width = width;
		child->height = height;
		child->path = image;

		_childrens.push_back(std::move(child));
	}

	void NativeTekstoLabel::begin_bitmap_pass(const std::optional<teksto::Color> &color)
	{
		int width = _block_width;
		int height = _block_ascender - _block_descender;

		_curChild = std::make_shared<LabelChild>();
		_curChild->type = LabelChildType::BITMAP;
		_curChild->x = _flexbox_x + _offset_x;
		_curChild->y = _flexbox_y + _offset_y;
		_curChild->width = width;
		_curChild->height = height;

		if (color.has_value() && color.value().a > 0) {
			_curChild->color = convert_to_cc_color(color.value());
		}

		if (_bg_color.has_value()) {
			_curChild->bg_color = convert_to_cc_color(_bg_color.value());
		}

		_canvas.reset(new teksto::DefaultCanvas(width, height, teksto::CanvasMode::RGBA8888));
		_canvas->set_pen_pos(0, _block_ascender);
		_canvas->begin_block(_block_width, _block_ascender, _block_descender, std::nullopt);
		
		_canvas->begin_bitmap_pass(std::nullopt);
	}

	void NativeTekstoLabel::begin_vector_pass(const std::optional<teksto::Color> &color)
	{
		_curChild = std::make_shared<LabelChild>();
		_curChild->type = LabelChildType::VECTOR;
		_curChild->color = convert_to_cc_color(color.value());
	}

	void NativeTekstoLabel::end_bitmap_pass()
	{
		if (_curChild && _curChild->type == LabelChildType::BITMAP && _canvas) {
			_canvas->end_block();

			auto& imageSource = _curChild->imageSource;
			imageSource.width = _canvas->width();
			imageSource.height = _canvas->height();
			const std::string& strdata = _canvas->buffer();

			imageSource.data = se::Object::createTypedArray(
				se::Object::TypedArrayType::UINT8,
				strdata.data(), 
				strdata.size());

			imageSource.compressed = false;
			imageSource.format = cc::PixelFormat::RGBA8888;

			_canvas->end_bitmap_pass();
			if (SAVE_PNG)
			{
				std::ostringstream ss;
				ss << _canvas.get() << ".png";
				printf("save path:%d\n", ss.str().c_str());
				_canvas->save(ss.str().c_str());
			}

			_canvas.reset();
			_childrens.push_back(std::move(_curChild));
		}
	}

	void NativeTekstoLabel::end_vector_pass()
	{

	}

	void NativeTekstoLabel::begin_block(int width, int ascender, int descender,
							  const std::optional<teksto::Color> &bg_color)
	{
		_block_width = width;
		_block_ascender = ascender;
		_block_descender = descender;
		_bg_color = bg_color;
	}

	void NativeTekstoLabel::end_block()
	{
		/*
		assert(_childrens.size());
		if (_curChild && _canvas)
		{
			_canvas->end_block();

			cc::IMemoryImageSource imageSource;
			imageSource.width = _canvas->width();
			imageSource.height = _canvas->height();
			const std::string& strdata = _canvas->buffer();

			imageSource.data = ccnew cc::ArrayBuffer((const uint8_t*)strdata.data(), static_cast<uint32_t>(strdata.size()));
			imageSource.compressed = false;
			imageSource.format = cc::PixelFormat::RGBA8888;
			_curChild->texture = std::make_shared<cc::Texture2D>();
			if (_curChild->texture) {
				auto* imgAsset = ccnew cc::ImageAsset();
				imgAsset->setNativeAsset(imageSource);
				_curChild->texture->setImage(imgAsset);
				_curChild->texture->initialize();
			}

			if (SAVE_PNG)
			{
				std::ostringstream ss;
				ss << _canvas.get() << ".png";
				printf("save path:%d\n", ss.str().c_str());
				_canvas->save(ss.str().c_str());
			}

			_canvas.reset();
		}*/
	}

	std::pair<int /*x*/, int /*y*/> NativeTekstoLabel::cur_pen_pos()
	{
		return std::make_pair(_flexbox_x, _flexbox_y);
	}

	void NativeTekstoLabel::set_pen_pos(int x, int y)
	{
		_flexbox_x = x;
		_flexbox_y = y;
	}

	void NativeTekstoLabel::advance_pen_pos(int x, int y)
	{
		if (_canvas) {
			_canvas->advance_pen_pos(x, y);
		}
	}

	void NativeTekstoLabel::draw_cursor(const teksto::SpaceVector& sv)
	{
		if (!m_cursorLayer) {
			m_cursorLayer = std::make_shared<LabelChild>();
			m_cursorLayer->type = LabelChildType::CURSOR;
			_childrens.push_back(m_cursorLayer);
		}

		m_cursorLayer->x = sv.x + _offset_x;
		m_cursorLayer->y = sv.y + _offset_y;
		m_cursorLayer->width = 2;
		m_cursorLayer->height = sv.h;
	}

	void NativeTekstoLabel::cur_cursor()
	{
		teksto::SpaceVector sv;
		if (_layout->get_cursor(sv)) {
			draw_cursor(sv);
		}
	}

	void NativeTekstoLabel::set_cursor(int x, int y)
	{
		teksto::SpaceVector sv;
		sv.x = x;
		sv.y = y;
		sv.h = 8;
		draw_cursor(sv);

		if (_layout->set_cursor(x, y)) {
			cur_cursor();
		}
		else {
			// sv.h = 0;
			// draw_cursor(sv);
		}
	}

	void NativeTekstoLabel::begin() {
		_layout->begin();
		cur_cursor();
	}
	void NativeTekstoLabel::end() {
		_layout->end();
		cur_cursor();
	}
	void NativeTekstoLabel::prev() {
		_layout->prev();
		cur_cursor();
	}
	void NativeTekstoLabel::next() {
		_layout->next();
		cur_cursor();
	}
	void NativeTekstoLabel::prev_line() {
		if (_layout->prev_line()) {
			cur_cursor();
		}
	}
	void NativeTekstoLabel::next_line() {
		if (_layout->next_line()) {
			cur_cursor();
		}
	}

	void NativeTekstoLabel::remove(int n) {
		auto o = _layout->remove(n);
		
		if (_layout->remove(n)) {
			doLayout();
		}
	}

	void NativeTekstoLabel::insert(std::string str) {
		if (_layout->insert(str)) {
			doLayout();
		}
	}

	teksto::MessageString NativeTekstoLabel::select(teksto::Vector& from, teksto::Vector& to, bool copy /*= false*/)
	{
		return _layout->select(from, to, copy);
	}
}