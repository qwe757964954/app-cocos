#pragma once

#include "layout.h"
#include "canvas.h"
#include "default-canvas.h"
#include "color.h"
#include "teksto.h"
#include "math/Color.h"
#include "math/Math.h"
#include "math/Geometry.h"
#include "context.h"
#include "core/assets/ImageAsset.h"
#include "core/assets/Texture2D.h"
#include <unordered_map>

namespace boyaa
{
	struct TekstoMessageText
	{
		std::string str;
		int size;
		cc::Color font_color;
		int slan;
		int weight;
	};

	enum LabelChildType {
		BITMAP,
		VECTOR,
		PACE_HOLDER,
		CURSOR,
	};

	struct MemoryImageSource {
		se::Object* data = nullptr;
		bool compressed{ false };
		uint32_t width{ 0 };
		uint32_t height{ 0 };
		cc::PixelFormat format{ cc::PixelFormat::RGBA8888 };
		ccstd::vector<uint32_t> mipmapLevelDataSize;
	};

	struct LabelChild
	{
	public:
		~LabelChild()
		{
			if(this->imageSource.data)
				this->imageSource.data->decRef();
		}

		LabelChildType type;
		float x = 0.f;
		float y = 0.f;
		float width = 0.f;
		float height = 0.f;
		uint32_t (color);
		uint32_t bg_color;
		MemoryImageSource imageSource;
		std::string path{""};
	};

	class NativeTekstoLabel : teksto::Canvas
	{
	public:
		static std::shared_ptr<teksto::Context> s_shared_context;
		static const std::shared_ptr<teksto::Context>& get_shared_context();
		NativeTekstoLabel();
		void set_html_text(const std::string &text);
		bool set_text(const std::vector<teksto::Message>& texts);
		void display(int& width, int& height);
		void measure(int& width, int& height);
		void set_max_lines(int lines);
		int max_lines() const;
		// �о�(����)
		bool set_line_space(float line_space);
		float line_space() const;
		// ���
		bool set_letter_spacing(int letter_spacing);
		int letter_spacing() const;

		// ʡ�Ժ�
		char32_t ellipsis_char() const;
		void set_ellipsis_char(char32_t ellipsis_char);

		bool set_line_truncate_mode(teksto::LineTruncateMode mode);
		teksto::LineTruncateMode line_truncate_mode() const;

		bool set_horizontal_alignment(teksto::LineAlignment mode);
		teksto::LineAlignment horizontal_alignment() const;

		bool set_vertical_alignment(teksto::TextAlignment mode);
		teksto::TextAlignment vertical_alignment() const;

		bool set_layout_alignment(teksto::LayoutAlignment mode);
		teksto::LayoutAlignment layout_alignment() const;

		const std::vector<std::shared_ptr<LabelChild>>& getChildrens() { return _childrens; }
		teksto::MessageString select(teksto::Vector& from, teksto::Vector& to, bool copy = false);
	public:
		void draw_cursor(const teksto::SpaceVector& sv);
		void cur_cursor();
		void set_cursor(int x, int y);
		void begin();
		void end();
		void prev();
		void next();
		void prev_line();
		void next_line();
		void remove(int n);
		void insert(std::string str);
	protected:
		void doLayout();
		// canvas
		int width() const override { return 0; }
		int height() const override { return 0; }

		void render_bitmap(teksto::Bitmap *bitmap, int left, int top, int x_advance, int y_advance) override;
		void render_vector(teksto::VectorType type, int height) override;
		void render_pace_holder(std::string image, int width, int height) override;

		void begin_bitmap_pass(const std::optional<teksto::Color> &color) override;
		void begin_vector_pass(const std::optional<teksto::Color> &color) override;
		void end_bitmap_pass()override;
		void end_vector_pass()override;
		void begin_block(int width, int ascender, int descender,
						 const std::optional<teksto::Color> &bg_color) override;
		void end_block() override;

		std::pair<int /*x*/, int /*y*/> cur_pen_pos() override;
		void set_pen_pos(int x, int y) override;
		void advance_pen_pos(int x, int y) override;

	private:
		std::shared_ptr<teksto::Layout> _layout;
		std::unique_ptr<teksto::DefaultCanvas> _canvas;
		int _flexbox_x = 0;
		int _flexbox_y = 0;
		int _offset_x = 0;
		int _offset_y = 0;
		int _block_width = 0;
		int _block_ascender = 0;
		int _block_descender = 0;
		int _layoutWidth = 0;
		int _layoutHeight = 0;
	private:
		std::shared_ptr<cc::Node> m_labelNode;
		std::vector<std::shared_ptr<LabelChild>> _childrens;
		std::shared_ptr<LabelChild> m_cursorLayer;


		std::shared_ptr<LabelChild> _curChild;
		std::optional<teksto::Color> _bg_color;
	};
};