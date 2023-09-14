import Yoga from '@react-pdf/yoga';

function format_str(str: string, ...args: any): string {
    var result = str;
    if (args.length > 0) {
        if (args.length == 1 && typeof (args[0]) == "object") {
            let obj = args[0];
            for (var key in obj) {

                let value = obj[key];
                if (typeof (value) == "string")
                    value = value.toString();

                if (obj[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, value);
                }
            }
        }
        else {
            for (var i = 0; i < args.length; i++) {
                if (args[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    let value = args[i];
                    if (typeof (value) == "string")
                        value = value.toString();
                    result = result.replace(reg, value);
                }
            }
        }
    }
    return result;
}

function get_value_str(name: string, value: Yoga.Value) {
    let str = ""
    if (value.unit == Yoga.UNIT_PERCENT) {
        str = format_str("{0}:{1}%", name, value.value)
    } else {
        str = format_str("{0}:{1}", name, value.value)
    }

    return str;
}

function get_align_name(algin: Yoga.Align) {
    switch (algin) {
        case Yoga.ALIGN_AUTO:
            {
                return "auto";
            }
        case Yoga.ALIGN_FLEX_START:
            {
                return "flex start";
            }
        case Yoga.ALIGN_FLEX_END:
            {
                return "flex end";
            }
        case Yoga.ALIGN_STRETCH:
            {
                return "stretch";
            }
        case Yoga.ALIGN_BASELINE:
            {
                return "baseline";
            }
        case Yoga.ALIGN_SPACE_BETWEEN:
            {
                return "between";
            }
        case Yoga.ALIGN_SPACE_AROUND:
            {
                return "space around";
            }
    }
    return "unknow_algin"
}

function get_yoga_direction_name(direction: Yoga.Direction) {
    switch (direction) {
        case Yoga.DIRECTION_INHERIT:
            {
                return "Inherit";
            }
        case Yoga.DIRECTION_RTL:
            {
                return "rtl";
            }
        case Yoga.DIRECTION_LTR:
            {
                return "ltr";
            }
    }
    return "unknow_direction";
}

function get_flex_direction_name(dir: Yoga.FlexDirection) {
    switch (dir) {
        case Yoga.FLEX_DIRECTION_COLUMN:
            {
                return "column";
            }
        case Yoga.FLEX_DIRECTION_COLUMN_REVERSE:
            {
                return "column_reverse";
            }
        case Yoga.FLEX_DIRECTION_ROW:
            {
                return "row";
            }
        case Yoga.FLEX_DIRECTION_ROW_REVERSE:
            {
                return "row reverse";
            }
    }

    return "unknow_flex_direction";
}

function get_justify_name(justify: Yoga.Justify) {
    switch (justify) {
        case Yoga.JUSTIFY_FLEX_START:
            {
                return "flex start";
            }
        case Yoga.JUSTIFY_CENTER:
            {
                return "center";
            }
        case Yoga.JUSTIFY_FLEX_END:
            {
                return "flex end";
            }
        case Yoga.JUSTIFY_SPACE_BETWEEN:
            {
                return "space between";
            }
        case Yoga.JUSTIFY_SPACE_AROUND:
            {
                return "space around";
            }
        case Yoga.JUSTIFY_SPACE_EVENLY:
            {
                return "space evenly";
            }
    }

    return "unknow_justify";
}

function get_flex_wrap_name(wrap: Yoga.FlexWrap) {
    switch (wrap) {
        case Yoga.WRAP_NO_WRAP:
            {
                return "no wrap";
            }
        case Yoga.WRAP_WRAP:
            {
                return "wrap";
            }
        case Yoga.WRAP_WRAP_REVERSE:
            {
                return "wrap reverse";
            }
    }

    return "unknow_wrap";
}

function get_position_type_name(type: Yoga.PositionType) {
    switch (type) {
        case Yoga.POSITION_TYPE_RELATIVE:
            return "relative";
        case Yoga.POSITION_TYPE_ABSOLUTE:
            return "absolute";
    }

    return "unknow position type";
}

export function yoga_node_to_string(node: Yoga.Node) {

    let nodeinfo: any = {}
    nodeinfo.width = get_value_str("width", node.getWidth());
    nodeinfo.height = get_value_str("height", node.getHeight());

    nodeinfo.maxWidth = get_value_str("max_width", node.getMaxWidth());
    nodeinfo.maxHeight = get_value_str("max_height", node.getMaxHeight());
    nodeinfo.minWidth = get_value_str("min_width", node.getMinWidth());
    nodeinfo.minHeight = get_value_str("min_height", node.getMinHeight());

    nodeinfo.aspectRatio = "aspect_ratio:" + node.getAspectRatio().toString();

    nodeinfo.padding = format_str("padding {0} {1} {2} {3}",
        get_value_str("left", node.getPadding(Yoga.EDGE_LEFT)),
        get_value_str("right", node.getPadding(Yoga.EDGE_RIGHT)),
        get_value_str("top", node.getPadding(Yoga.EDGE_TOP)),
        get_value_str("bottom", node.getPadding(Yoga.EDGE_BOTTOM)));

    nodeinfo.border = format_str("border {0} {1} {2} {3}",
        get_value_str("left", node.getBorder(Yoga.EDGE_LEFT)),
        get_value_str("right", node.getBorder(Yoga.EDGE_RIGHT)),
        get_value_str("top", node.getBorder(Yoga.EDGE_TOP)),
        get_value_str("bottom", node.getBorder(Yoga.EDGE_BOTTOM)));

    nodeinfo.margin = format_str("margin {0} {1} {2} {3}",
        get_value_str("left", node.getMargin(Yoga.EDGE_LEFT)),
        get_value_str("right", node.getMargin(Yoga.EDGE_RIGHT)),
        get_value_str("top", node.getMargin(Yoga.EDGE_TOP)),
        get_value_str("bottom", node.getMargin(Yoga.EDGE_BOTTOM)));

    nodeinfo.position = format_str("position {0} {1} {2} {3}",
        get_value_str("left", node.getPosition(Yoga.EDGE_LEFT)),
        get_value_str("right", node.getPosition(Yoga.EDGE_RIGHT)),
        get_value_str("top", node.getPosition(Yoga.EDGE_TOP)),
        get_value_str("bottom", node.getPosition(Yoga.EDGE_BOTTOM)));

    nodeinfo.positionType = format_str("position type:{0}", get_position_type_name(node.getPositionType()))

    nodeinfo.flexDirection = format_str("flex direction: {0}", get_flex_direction_name(node.getFlexDirection()))

    nodeinfo.grow = format_str("grow:{0}", node.getFlexGrow())

    nodeinfo.shrink = format_str("shrink:{0}", node.getFlexShrink())

    nodeinfo.flexWrap = format_str("flexWrap:{0}", get_flex_wrap_name(node.getFlexWrap()))

    nodeinfo.justifyContent = format_str("JustifyContent:{0}", get_justify_name(node.getJustifyContent()))

    nodeinfo.alignItems = format_str("align items:{0}", get_align_name(node.getAlignItems()))

    nodeinfo.alignSelf = format_str("align self:{0}", get_align_name(node.getAlignSelf()))

    nodeinfo.alignContent = format_str("align content:{0}", get_align_name(node.getAlignContent()))

    let str = `layout:
               ${nodeinfo.width} ${nodeinfo.height} 
               ${nodeinfo.maxWidth} ${nodeinfo.maxHeight} 
               ${nodeinfo.minWidth} ${nodeinfo.minHeight}
               ${nodeinfo.aspectRatio}
               ${nodeinfo.padding}
               ${nodeinfo.border}
               ${nodeinfo.margin}
               ${nodeinfo.positionType}
               ${nodeinfo.position}
               flex:
               ${nodeinfo.flexDirection}
               ${nodeinfo.grow}
               ${nodeinfo.shrink}
               ${nodeinfo.flexWrap}
               alignment:
               ${nodeinfo.justifyContent}
               ${nodeinfo.alignItems}
               ${nodeinfo.alignSelf}
               ${nodeinfo.alignContent}
               `
    return str;
}