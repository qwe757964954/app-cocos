import * as cc from 'cc';
class utils {

    public static isEmpty(str: string){
        if(str.trim().length === 0){
            return true;
        }
        return false;
     }
 
    public static isPhoneNumber(phone: string){
        if(this.isEmpty(phone)){
            return false;
        }
        //通过正则表达式判断手机号码格式是否正确,根据电信，联通、移动手机号码规则可以到以下正则
        // 手机号码第一位是[1]开头，第二位[3,4,5,7,8]中的一位，第三位到第十一位则是[0-9]中的数字；
        //^1表示开头为1
        //[3|4|5|7|8] 表示3、4、5、7、8中的一位数值
        //[0-9]{9} 匹配包含0-9的数字
        let reg = /^1[3|4|5|7|8][0-9]{9}/;
        if(reg.test(phone)){
            return true;//手机号码正确
        }
        return false;
    }
    public static setPhoneFormat(phoneNumber: string): string {
        const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
        return formattedPhoneNumber;
    }
    public static checkChinese(myString: string): boolean {
        const chineseRegex = /[\u4E00-\u9FFF]/;
        if (chineseRegex.test(myString)) {
            return true;
        } else {
            return false;
        }
    }
    public static checkAccountIsEmail(account: string): boolean {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(account);
    }

    public static encryptIDNumber(idNumber: string): string {
        const encryptedPart = idNumber.substring(5, 11).replace(/\d/g, '*');
        return idNumber.substring(0, 5) + encryptedPart + idNumber.substring(14);
    }

    public static verifyIDCard(idCardNumber: string): boolean {
        // 判断是否为18位
        if (idCardNumber.length !== 18) {
          return false;
        }
        
        // 判断前17位是否为数字
        const idCardNumberWithoutLastDigit = idCardNumber.slice(0, 17);
        if (!/^\d+$/.test(idCardNumberWithoutLastDigit)) {
          return false;
        }
        
        // 判断最后一位是否合法
        const lastDigit = idCardNumber.slice(-1);
        const weightedSum = idCardNumberWithoutLastDigit.split('')
          .map(Number)
          .reduce((sum, digit, index) => sum + digit * ((1 << (17 - index)) % 11), 0);
        const checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'][weightedSum % 11];
        return lastDigit === checkCode;
      }
      
      public static validateName(name: string): boolean {
        // 中文姓名至少两个汉字，且不能包含数字或特殊字符
        const regex = /^[\u4e00-\u9fa5]{2,}$/;
        return regex.test(name);
      }

}

export { utils }