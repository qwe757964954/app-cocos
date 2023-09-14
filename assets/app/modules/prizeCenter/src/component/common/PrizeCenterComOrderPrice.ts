import { _decorator, Component, Node,Label } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import {PaymentPrice}  from '../../interfaceData/define';
import { IPrice } from 'idl/tss/hall/common/prizemall';
import { NetImageEx } from 'app/components/NetImageEx';
import {PrizeUtil} from '../../utils/PrizeUtil';
import { Log } from 'bos/exports';

@ccclass('PrizeCenterComOrderPrice')
export class PrizeCenterComOrderPrice extends XComponent {
    @property(Label)
    priceLab:Label = null!;

    @property(Label)
    vouchLab:Label = null!;

    @property(Label)
    titleLab:Label = null!;

    @property(Label)
    rmbLab:Label = null!;

    @property(Node)
    vouchLayout:Node = null!;

    @property(Node)
    mungLayout:Node = null!;

    @property(Node)
    icon:Node = null!;

    @property
    title = '单价:';

    onLoad() {
        
    }

    resetUI(){
        this.titleLab.string = this.title;
        this.rmbLab.string = '';
        this.vouchLayout.active = false;
        this.mungLayout.active = false;   
    }
    
    //设置单价
    init(price:IPrice) {
        this.resetUI();
        this.mungLayout.active = true;
        let asset = price?.asset;
        this.priceLab.string = `x ${PrizeUtil.formatPrice(asset.amount)}`;
        this.icon.getComponent(NetImageEx)!.setUrl(asset.icon ?? '');
    }

    //合计的
    setTotalPrize(paymentPrice:PaymentPrice) {
        this.rmbLab.string = '';
        this.vouchLayout.active = false;
        this.mungLayout.active = false;
        if (paymentPrice.voucher>0){
            this.vouchLayout.active = true;
            let contactStr = paymentPrice.mungNum>0? '+' :'';
            this.vouchLab.string = `x ${PrizeUtil.formatPrice(paymentPrice.voucher) + contactStr}`;
        }
        if (paymentPrice.mungNum>0){
            this.mungLayout.active = true;
            this.priceLab.string = `x ${PrizeUtil.formatPrice(paymentPrice.mungNum)}`;
        }
        if (paymentPrice.RMB >0){
            this.rmbLab.string = `+ ${paymentPrice.RMB.toString()}`;
        }
    }
}