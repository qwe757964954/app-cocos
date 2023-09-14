#pragma once

#include <string>

enum class KeyboardAction
{
    kShow,
    kHide,
    kInsert,
    kDeleteBackward,
    kSetMarkedText,
    kReplace,
};

enum class KeyboardType
{
    kDefault = 0,
    kASCIICapable,
    kNumbersAndPunctuation,
    kURL,
    kNumberPad,
    kPhonePad,
    kNamePhonePad,
    kEmailAddress,
    kDecimalPad,
    kTwitter,
    kWebSearch
};

enum class KeyboardAppearance
{
    kDefault = 0,
    kDark,
    kLight,
    kAlert,
};

enum class KeyboardReturnType
{
    kDefault = 0,
    kGo,
    kGoogle,
    kJoin,
    kNext,
    kRoute,
    kSearch,
    kSend,
    kYahoo,
    kDone,
    kEmergencyCall,
    kContinue,
};

enum class KeyboardCapitalizationType
{
    kNone = 0,
    kWords,
    kSentences,
    kAllCharacters,
};

struct Rect
{
    float x = 0.f;
    float y = 0.f;
    float width = 0.f;
    float height = 0.f;
};

struct KeyboardEvent
{
    KeyboardAction action;
    int n;
    std::string text;
    Rect keyboard_rect;
};

class Keyboard
{
public:
    struct ShowInfo
    {
        KeyboardType type;
        KeyboardAppearance appearance;
        KeyboardReturnType returntype;
        KeyboardCapitalizationType capitalization;
    };

    static void on_keyboard_event(const KeyboardEvent& event_data) {}
    static void show(const ShowInfo& info) {}
    static void hide() {}

    static void on_keyboard_show(float x, float y, float w, float h) {}
    static void on_keyboard_hide() {}

    static void on_insert_text(std::string txt) {}
    static void on_replace_text(int n, std::string txt) {}
    static void on_delete_backward(int n = 1) {}
    static void on_mark_text(std::string s) {}
};
