import {HtmlTextParser, RichText } from 'cc'
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Utils } from 'app/utils/Utils';
import { uiMgr } from 'bos/exports';

@ccclass('RuleDialog')
export class RuleDialog extends XComponent {
	@property(RichText)
	contentRichText : RichText

    @Utils.background()
    onLoad(): void {
        
    }

    start() {

    }

    setup(htmlText){
        console.debug("RuleDialog setup", htmlText)
        // let data = HtmlTextParser.prototype.parse(htmlText)
        // console.debug("RuleDialog setup", data)

        this.contentRichText.string = htmlText
    }

    onClose() {
        uiMgr.removePopup(this.node)
    }
}