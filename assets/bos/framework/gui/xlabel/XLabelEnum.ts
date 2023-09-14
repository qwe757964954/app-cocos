export enum DirtyFlag {
    TEXT = 1 << 0,
    HTML_TEXT = 1 << 1,
    FONT_SIZE = 1 << 2,
    LINE_SPACE = 1 << 3,
    LETTER_SPACE = 1 << 4,
    FONT_FAMILY = 1 << 5,
    USE_SYSTEM_FONT = 1 << 6,
    FONT = 1 << 7,
    MAX_WIDTH = 1 << 8,
    FONT_SLANT = 1 << 9,
    FONT_WEIGHT = 1 << 10,
    LINE_TRUNCATE_MODE = 1 << 11,
    LINE_BREAK_MODE = 1 << 12,
    HORIZONTAL_ALIGNMENT = 1 << 13,
    VERTICAL_ALIGNMENT = 1 << 14,
    LAYOUT_ALIGNMENT = 1 << 15,
    FONT_COLOR = 1 << 16,
    UNDER_LINE = 1 << 17,
    SIZE_CHANGE_ATTR = TEXT | HTML_TEXT | FONT_SIZE | LINE_SPACE | LETTER_SPACE | FONT_FAMILY | USE_SYSTEM_FONT | FONT | FONT_SLANT | FONT_WEIGHT,
    TEXT_GROUP = HTML_TEXT | TEXT | FONT_SIZE | FONT_SLANT | FONT_WEIGHT | FONT_COLOR | UNDER_LINE,
    ALL = 0xFFFFFF,
};

export enum XLabelEvent {
    TOUCH_SELECT_BEGIN = "touch_select_begin",
    TOUCH_SELECT_END = "touch_select_end",
    TOUCH_SELECT_UPDATE = "touch_select_update",
}