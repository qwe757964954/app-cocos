#pragma once

#include <map>
#include <memory>
#include <optional>
#include <string>

#include "teksto.h"

namespace teksto {

namespace impl {
class FreeTypeContext;
class FontSet;
}  // namespace impl

class EXPORT Context : public std::enable_shared_from_this<Context> {
    using FreeTypeContextImpl = impl::FreeTypeContext;
    using FontSetImpl = impl::FontSet;

public:
    std::shared_ptr<Context> get_shared_from_this() {
        return shared_from_this();
    }

    bool init(bool debug);

    bool register_holder(const std::string& tag, int width = 0, int height = 0);
    bool unregister_holder(const std::string& tag);
    std::optional<std::pair<int, int>> get_holder(const std::string& tag);

    const std::string& default_family() const { return _default_family; }
    void set_default_family(const std::string& default_family);

    // 均返回对应的family
    std::string register_font(const std::string& path, std::optional<std::string> tag = std::nullopt);
    std::string unregister_font(const std::string& path);
    std::vector<std::string> unregister_all();

    std::optional<std::string> get_family(const std::string& tag) const {
        auto it = _family_tags.find(tag);
        if (_family_tags.end() != it) {
            return it->second;
        }
        return std::nullopt;
    }

    const std::shared_ptr<FreeTypeContextImpl>& ftcontext() {
        return _ftcontext;
    }
    const std::shared_ptr<FontSetImpl>& font_set() { return _font_set; }

private:
    std::map<std::string, std::pair<int, int>> _holders;
    std::map<std::string, std::string> _family_tags;

    std::string _default_family;
    std::shared_ptr<FreeTypeContextImpl> _ftcontext = nullptr;
    std::shared_ptr<FontSetImpl> _font_set = nullptr;
};

}  // namespace teksto
