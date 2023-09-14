import { Log } from 'bos/exports';
import {ComputeSinglePrice,PaymentPrice} from '../interfaceData/define';
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import * as ExchangeOrderPKG from 'idl/tss/hall/exchangeorder.v7';
import { IPrice } from 'idl/tss/hall/common/prizemall';
import { AssetType,IAssetItem} from 'idl/tss/common/common_define';

export class PrizeUtil {

    /**
     * 根据时间戳，显示时间,毫秒
     * @example
     * TimeUtil.getTimeTab(); // 1614616955186
     */
    public static getTimeTab(timestamp) {
        const date = new Date(timestamp); // 使用 Date 构造函数创建 Date 对象
        return {
            year:date.getFullYear(), // 获取年份
            month:date.getMonth() + 1, // 获取月份（注意要加 1，因为 JavaScript 的月份从 0 开始）
            day:date.getDate(),// 获取日期
            hour:date.getHours(), // 获取小时
            minute:date.getMinutes(), // 获取分钟
            second:date.getSeconds(), // 获取秒数
        }
    }

    /**
     * 获取指定时间的时间戳
     * @example
     * TimeUtil.getTargetTimestamp(2022-01-01T00:00:00Z); // 1614616955186
     */
    public static getTargetTimestamp(str:string): number {
        const dateStr = str;
        const date = new Date(dateStr);  
        // 获取时间戳（以毫秒为单位）
        const timestamp = date.getTime();
        return timestamp
    }

    //示例输出：2023年06月14日 09:26
    public static formatDate(timestamp) {
        let date = this.getTimeTab(timestamp);
        return `${date.year}年${date.month.toString().padStart(2, '0')}月${date.day.toString().padStart(2, '0')}日${date.hour.toString().padStart(2, '0')}:${date.minute.toString().padStart(2, '0')}`;
    }
    //示例输出：2023-06-14 09:26:30  
    public static formatDate2(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        return formattedDate
    }
    
    //格式化价格 1.02万
    public static formatPrice(price:number):string{
        const retain = (num: number, decimal: number) => {
            let numStr = num.toString();
            let index = numStr.indexOf(".");
            if (index !== -1) {
              numStr = numStr.substring(0, decimal + index + 1);
            } else {
              numStr = numStr.substring(0);
            }
            return parseFloat(numStr).toFixed(decimal);
          };
        
        const removeTailZero = (str: string) => {
        return str.replace(/\.?0+$/, "");
        };
        
        if (price < Math.pow(10, 4)) return price.toString();
        if (price < Math.pow(10, 8)) {
        return removeTailZero(retain(price / Math.pow(10, 4), 2)) + "万";
        } else {
        return removeTailZero(retain(price / Math.pow(10, 8), 2)) + "亿";
        }
    }


        /**
     * 计算单个物品的总价,用于售前，计算出来最终的Price
     * @example
     * TimeUtil.getPrizeTab(); // 1614616955186
     */
    public static getSinglePrize(params:ComputeSinglePrice):IPrice{
        let priceNum = params.amount ?? 1;
        let price = params.pricePlan.normalPrice;
        let amount = priceNum * price.asset.amount;
        let result:IPrice = {
            RMB:price.RMB * priceNum,
            asset:{},
        };
        Object.keys(price.asset).forEach((key:string)=>{
            result.asset[key] = price.asset[key];
        });
        result.asset.id = price.asset.id;
        result.asset.amount = amount ;
        return result;
    }

    /**
     * 计算单个物品的总价,用于售前,已经知道单个的price
     * @example
     * TimeUtil.getPrizeTab(); // 1614616955186
     */
    public static getTotalBySingle(singlePrice:IPrice,amount:number):IPrice{
        let assetUnit = singlePrice.asset;
        let total:IPrice = {
            RMB:(amount * singlePrice.RMB),
            asset:{
                amount:amount * assetUnit.amount,
                icon:assetUnit.icon,
                name:assetUnit.name,
                id:assetUnit.id,
                type:assetUnit.type,
            },
        };
        return total;
    }

    //计算总价，主要因为券不同的时候，需要合计成券 + 红包券的格式
    public static computePaymentPrice(computeSinglePrices:Array<ComputeSinglePrice>):PaymentPrice{
        let mungNum = 0;
        let voucher = 0;
        let RMB = 0;
        for (const singlePrice of computeSinglePrices) {
            let singleResult = this.getSinglePrize(singlePrice);
            let asset = singleResult.asset
            let assetType = asset?.type
            if (assetType == AssetType.AssetTypeMung){
                mungNum = mungNum + asset.amount;
            }else {
                voucher = voucher + asset.amount;
            }
            RMB = RMB + singleResult.RMB;
        }
        let result:PaymentPrice= {
            mungNum:mungNum,
            voucher:voucher,
            RMB:RMB,
        };
        return result;
    }

    /**
     * 获取购物车的价格计划
     * @example
     * TimeUtil.getPrizeTab(); // 1614616955186
     */
    public static getPricePlanByCar(userCartItem:PrizeMallPKG.IUserCartItem):PrizeMallPKG.IPricePlan{
        let pricePlan = ((pricePlanType)=>{
            for (const pricePlan of userCartItem.sku.prices) {
                if (pricePlan.type == pricePlanType){
                    return pricePlan
                }
            }
        })(userCartItem.cartItem.pricePlanType);  
        return pricePlan;    
    }

    /**
     * 获取订单实际总价（售后，已经支付过了,返回的的券 + 红包券的统计）
     */
    public static getPaymentByOrder(order:ExchangeOrderPKG.IOrder):PaymentPrice{
        let mungNum = 0;
        let voucher = 0;
        for (const payment of order.assetPayments) {
            let asset = payment.price.asset;
            if (asset.type == AssetType.AssetTypeMung){
                mungNum = mungNum + asset.amount
            }else {
                voucher = voucher + asset.amount
            }
        }
        let result:PaymentPrice= {
            mungNum:mungNum,
            voucher:voucher,
            RMB:order?.RMBPayment?.price.RMB,
        };
        return result;   
    }
        /**
     * 获取订单实际总价（售后，已经支付过了，返回具体的详情）
     */
    public static getPriceByOrder(order:ExchangeOrderPKG.IOrder):IPrice{
        let asset = order.assetPayments?.[0].price.asset;
        let price:IPrice = {
            RMB:order.RMBPayment?.price.RMB,
            asset:{
                id:asset.id,
                amount:asset.amount,
                icon:asset.icon,
                desc:asset.desc,
                name:asset.name,
                type:asset.type,
            }
        };
        return price;
    }

    //*获取sku的价格计划
    public static getPricePlanBySKU(planType:number,sku:PrizeMallPKG.ISKU):PrizeMallPKG.IPricePlan{
        for (const pricePlan of sku.prices) {
            if (pricePlan.type == planType){
                return pricePlan;
            }
        }
    }

}