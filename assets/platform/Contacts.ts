import { NativeDevice, log } from "./NativeDevice";

export class Contacts {

    public static NO_PERMISSION_INT: number = NativeDevice.NO_PERMISSION_INT;
    public static NO_PERMISSION_STRING: string = NativeDevice.NO_PERMISSION_STRING;

    /**
     * 选择成功
     */
    public static SELECT_SUCCESS= 0;

    /**
     * 取消选择
     */
    public static SELECT_CANCEL = 1;

    /**
     * 选择出错
     */
      public static SELECT_ERROR = 2;

  /**
   * 
   * @param key string,根据什么查找,如联系人名称.
   * @param callback (result: any) => void类型.
   * 当读取到数据时result是一个json数组(object类型,可能为空数组)可直接遍历取值,
   * 当没有授权时result是一个string值为Contacts.NO_PERMISSION_STRING.
   * 回调结果result示例:
    [
        {
            "id": "5",
            "name": "章北海",
            "timestamp": 1606345497447,
            "phone_numbers": {
                "Mobile": "123 456",
                "Home": "987 6",
                "Work": "00 000",
                "Other": "432 1"
            }
        }
    ]

    示例:
    import { Contacts } from "./platform/exports";
    var contactsCallback = (result: any) => {
        if (typeof result === 'object'){
            result.forEach((obj: any) => {
                console.log(obj.name);
            });
        }else {
            //result是Contacts.NO_PERMISSION_STRING
        } 
    }
    Contacts.search("章北海",contactsCallback);
   */
    static search(key :string,listener :(result :any) => void): void {
        NativeDevice.search(key,listener);
    }
   
    /**
     * 
     * @param listener (result: number) => void类型.
     * 
     * 回调:
     * result:number,联系人个数,如果没有授权result为Contacts.NO_PERMISSION_INT.
     * 
     * 示例:
        var contactsCallback = (result: number) => {

        }
        Contacts.getCount(contactsCallback);
     */
    static getCount(listener :(result :number) => void): void {
        NativeDevice.getCount(listener);
    }
    
    /**
     * 
     * @param start number,从第几个联系人开始读.
     * @param num 	number,读取几个联系人.
     * @param listener (result: any) => void类型.
     * 
     * 当读取到数据时result是一个json数组(object类型,可能为空数组)可直接遍历取值,
     * 当没有授权时result是一个string值为Contacts.NO_PERMISSION_STRING.
     * 回调结果result示例:
        [
            {
                "id": "4",//联系人唯一id值.
                "name": "罗缉",//联系人名称.
                "timestamp": 1663232969027,//最后一次修改联系人的时间戳.
                "phone_numbers": {}//各种类型的电话.

            },
            {
                "id": "5",
                "name": "章北海",
                "timestamp": 1606345497447,
                "phone_numbers": {
                    "Mobile": "123 456",
                    "Home": "987 6",
                    "Work": "00 000",
                    "Other": "432 1"
                }
            }
        ]

        示例:
        import { Contacts } from "./platform/exports";
        var contactsCallback = (result: any) => {
            if (typeof result === 'object'){
                result.forEach((obj: any) => {
                    console.log(obj.name);
                });
            }else {
                //result是Contacts.NO_PERMISSION_STRING
            } 
        }
        Contacts.read(0,4,contactsCallback);
     */
    static read(start :number,num :number,listener :(result :any) => void): void {
        NativeDevice.read(start,num,listener);
    }
    
    /**
     * 打开系统联系人界面选择某个联系人后回调手机号码
     * @param listener (callbackInfo :any) => void类型.
     * 回调:
     * callbackInfo是一个json对象包含以下可以直接读取的字段值:
     * 
     * status: number,取以下值:
     * 
     * Contacts.SELECT_SUCCESS 选择成功
     * 
     * Contacts.SELECT_CANCEL 取消选择
     * 
     * Contacts.SELECT_ERROR 出现错误
     * 
     * name: string,当status为Contacts.SELECT_SUCCESS时为联系人姓名,其它值时为"".
     * 
     * number: string,当status为Contacts.SELECT_SUCCESS时为手机号码,
     * 
     * status为Contacts.SELECT_CANCEL时是"",status为Contacts.SELECT_ERROR时是错误信息,
     * 当没有授权时status为Contacts.NO_PERMISSION_INT,number为Contacts.NO_PERMISSION_STRING.
     * 
     *示例:
        import { Contacts } from "./platform/exports";

        let contactsCallback = (contactInfo :any) => {

           let result = "status: " + contactInfo.status + ",number: " + contactInfo.number + ",name: " + contactInfo.name;

           console.log(result);

        }

        Contacts.selectContact(contactsCallback);
     * 
     */
    static selectContact(listener :(contactInfo :any) => void): void{
        NativeDevice.selectContact(listener);
    }
}
 

 