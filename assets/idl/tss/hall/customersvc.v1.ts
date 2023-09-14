import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  State as tss_common_State ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  SysMailBody as tss_common_SysMailBody,ISysMailBody as tss_common_ISysMailBody ,  } from "idl/tss/common/common_define"
import {  SendSysMailReq as tss_hall_mail_v2_SendSysMailReq,ISendSysMailReq as tss_hall_mail_v2_ISendSysMailReq ,  } from "idl/tss/hall/mail.v2"
export enum QuestionType {  
    QuestionTypeUnknown = 0,  
    QuestionTypeSingleChoice = 1,  
    QuestionTypeMultiChoice = 2,  
    QuestionTypeRadio = 3,  
    QuestionTypeFillInTheBlank = 4,  
    QuestionTypeLocation = 5,
}
export enum AnswerOrderType {  
    AnswerOrderTypeUnknown = 0,  
    AnswerOrderTypeASC = 1,  
    AnswerOrderTypeRandom = 2,
}
export enum CODE {  
    OK = 0,  
    AlreadyDone = 1,
}
export enum PeriodType {  
    PeriodTypeUnknown = 0,  
    PeriodTypeOnce = 1,  
    PeriodTypeInfinite = 2,  
    PeriodTypeDay = 3,  
    PeriodTypeWeek = 4,  
    PeriodTypeMonth = 5,  
    PeriodTypeUserDefined = 6,
}
export enum UserGiftStateType {  
    UserGiftStateTypeUnknown = 0,  
    UserGiftStateTypeAvailable = 1,  
    UserGiftStateTypeAcquired = 2,
}
export enum UserGiftStateErrorCode {  
    UserGiftStateErrorCodeUnknown = 0,  
    UserGiftStateErrorCodeAcquired = 1,  
    UserGiftStateErrorCodeAboveOnce = 2,  
    UserGiftStateErrorCodeDay = 3,  
    UserGiftStateErrorCodeWeek = 4,  
    UserGiftStateErrorCodeMonth = 5,  
    UserGiftStateErrorCodeAboveUserDefined = 6,  
    UserGiftStateErrorCodeConfigUndefined = 7,  
    UserGiftStateErrorCodeMailFailed = 8,
}
export enum ReportType {  
    ReportTypeNone = 0,  
    ReportTypeAvatar = 1,  
    ReportTypeNickname = 2,  
    ReportTypeTalk = 3,  
    ReportTypeCheat = 4,  
    ReportTypeNotSpecified = 5,
}
export enum ReportStatus {  
    ReportStatusUnknown = 0,  
    ReportStatusPending = 1,  
    ReportStatusSolved = 2,  
    ReportStatusIgnore = 3,
}
export interface IQuestionnaire {
    id?: string|null
    describe?: string|null
    exprieAt?: number|null
    awardConfig?: IAwardConfig
    questions?: IQuestion[]
    state?: tss_common_State|null
    createdAt?: number|null
    updatedAt?: number|null
    operator?: string|null
    name?: string|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_Questionnaire")
export class Questionnaire extends protobuf.Message<IQuestionnaire> {
    constructor(properties: Properties<IQuestionnaire>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.describe) { this.describe = properties.describe }
            if (properties.exprieAt) { this.exprieAt = properties.exprieAt }
            if (properties.awardConfig) { this.awardConfig = AwardConfig.create(properties.awardConfig) as any }
            if (properties.questions) { this.questions = []; properties.questions.forEach((value, index)=>{this.questions[index] = Question.create(properties.questions[index]) as any})}
            if (properties.state) { this.state = properties.state }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.name) { this.name = properties.name }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public describe?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public exprieAt?: number|null = 0
    @protobuf.Field.d(4, "tss_hall_customersvc_v1_AwardConfig", "optional")
    public awardConfig?: AwardConfig|null
    @protobuf.Field.d(5, "tss_hall_customersvc_v1_Question", "repeated")
    public questions?: Question[] = []
    @protobuf.Field.d(6, tss_common_State, "optional", tss_common_State.StateUnknown)
    public state?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(7, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(11, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IAnswer {
    id?: string|null
    seq?: number|null
    img?: string|null
    enableFillBlank?: boolean|null
    content?: string|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_Answer")
export class Answer extends protobuf.Message<IAnswer> {
    constructor(properties: Properties<IAnswer>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.seq) { this.seq = properties.seq }
            if (properties.img) { this.img = properties.img }
            if (properties.enableFillBlank) { this.enableFillBlank = properties.enableFillBlank }
            if (properties.content) { this.content = properties.content }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public seq?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(4, "bool", "optional", false)
    public enableFillBlank?: boolean|null = false
    @protobuf.Field.d(5, "string", "optional", )
    public content?: string|null = ""
}
export interface IQuestion {
    id?: string|null
    refsAnswerID?: string[]
    seq?: number|null
    content?: string|null
    answerOrderType?: AnswerOrderType|null
    questionType?: QuestionType|null
    answers?: IAnswer[]
    refsQuestionID?: string|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_Question")
export class Question extends protobuf.Message<IQuestion> {
    constructor(properties: Properties<IQuestion>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.refsAnswerID) { this.refsAnswerID = []; properties.refsAnswerID.forEach((value, index)=>{this.refsAnswerID[index] = properties.refsAnswerID[index]})}
            if (properties.seq) { this.seq = properties.seq }
            if (properties.content) { this.content = properties.content }
            if (properties.answerOrderType) { this.answerOrderType = properties.answerOrderType }
            if (properties.questionType) { this.questionType = properties.questionType }
            if (properties.answers) { this.answers = []; properties.answers.forEach((value, index)=>{this.answers[index] = Answer.create(properties.answers[index]) as any})}
            if (properties.refsQuestionID) { this.refsQuestionID = properties.refsQuestionID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "repeated", [])
    public refsAnswerID?: string[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public seq?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(5, AnswerOrderType, "optional", AnswerOrderType.AnswerOrderTypeUnknown)
    public answerOrderType?: AnswerOrderType|null = AnswerOrderType.AnswerOrderTypeUnknown
    @protobuf.Field.d(6, QuestionType, "optional", QuestionType.QuestionTypeUnknown)
    public questionType?: QuestionType|null = QuestionType.QuestionTypeUnknown
    @protobuf.Field.d(7, "tss_hall_customersvc_v1_Answer", "repeated")
    public answers?: Answer[] = []
    @protobuf.Field.d(8, "string", "optional", )
    public refsQuestionID?: string|null = ""
}
export interface IAwardConfig {
    props?: tss_common_IAssetItem[]
    mail?: tss_common_ISysMailBody
}
@protobuf.Type.d("tss_hall_customersvc_v1_AwardConfig")
export class AwardConfig extends protobuf.Message<IAwardConfig> {
    constructor(properties: Properties<IAwardConfig>) {
        super(properties);
        if (properties) {
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = tss_common_AssetItem.create(properties.props[index]) as any})}
            if (properties.mail) { this.mail = tss_common_SysMailBody.create(properties.mail) as any }
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public props?: tss_common_AssetItem[] = []
    @protobuf.Field.d(2, "tss_common_SysMailBody", "optional")
    public mail?: tss_common_SysMailBody|null
}
export interface ILocation {
    province?: string|null
    city?: string|null
    region?: string|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_Location")
export class Location extends protobuf.Message<ILocation> {
    constructor(properties: Properties<ILocation>) {
        super(properties);
        if (properties) {
            if (properties.province) { this.province = properties.province }
            if (properties.city) { this.city = properties.city }
            if (properties.region) { this.region = properties.region }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public province?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public city?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public region?: string|null = ""
}
export interface IUserAnswer {
    answerID?: string|null
    content?: string|null
    radio?: number|null
    loc?: ILocation
}
@protobuf.Type.d("tss_hall_customersvc_v1_UserAnswer")
export class UserAnswer extends protobuf.Message<IUserAnswer> {
    constructor(properties: Properties<IUserAnswer>) {
        super(properties);
        if (properties) {
            if (properties.answerID) { this.answerID = properties.answerID }
            if (properties.content) { this.content = properties.content }
            if (properties.radio) { this.radio = properties.radio }
            if (properties.loc) { this.loc = Location.create(properties.loc) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public answerID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public radio?: number|null = 0
    @protobuf.Field.d(4, "tss_hall_customersvc_v1_Location", "optional")
    public loc?: Location|null
}
export interface IUserQuestionAnswer {
    questionID?: string|null
    answers?: IUserAnswer[]
}
@protobuf.Type.d("tss_hall_customersvc_v1_UserQuestionAnswer")
export class UserQuestionAnswer extends protobuf.Message<IUserQuestionAnswer> {
    constructor(properties: Properties<IUserQuestionAnswer>) {
        super(properties);
        if (properties) {
            if (properties.questionID) { this.questionID = properties.questionID }
            if (properties.answers) { this.answers = []; properties.answers.forEach((value, index)=>{this.answers[index] = UserAnswer.create(properties.answers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public questionID?: string|null = ""
    @protobuf.Field.d(2, "tss_hall_customersvc_v1_UserAnswer", "repeated")
    public answers?: UserAnswer[] = []
}
export interface IUserAnswerSheet {
    questionnaireID?: string|null
    UID?: number|null
    answers?: IUserQuestionAnswer[]
    createdAt?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_UserAnswerSheet")
export class UserAnswerSheet extends protobuf.Message<IUserAnswerSheet> {
    constructor(properties: Properties<IUserAnswerSheet>) {
        super(properties);
        if (properties) {
            if (properties.questionnaireID) { this.questionnaireID = properties.questionnaireID }
            if (properties.UID) { this.UID = properties.UID }
            if (properties.answers) { this.answers = []; properties.answers.forEach((value, index)=>{this.answers[index] = UserQuestionAnswer.create(properties.answers[index]) as any})}
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public questionnaireID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_customersvc_v1_UserQuestionAnswer", "repeated")
    public answers?: UserQuestionAnswer[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface IRadioStatistics {
    radioVal?: number|null
    cnt?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_RadioStatistics")
export class RadioStatistics extends protobuf.Message<IRadioStatistics> {
    constructor(properties: Properties<IRadioStatistics>) {
        super(properties);
        if (properties) {
            if (properties.radioVal) { this.radioVal = properties.radioVal }
            if (properties.cnt) { this.cnt = properties.cnt }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public radioVal?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public cnt?: number|null = 0
}
export interface IAnswerStatistics {
    answerID?: string|null
    cnt?: number|null
    radioAnswers?: IRadioStatistics[]
}
@protobuf.Type.d("tss_hall_customersvc_v1_AnswerStatistics")
export class AnswerStatistics extends protobuf.Message<IAnswerStatistics> {
    constructor(properties: Properties<IAnswerStatistics>) {
        super(properties);
        if (properties) {
            if (properties.answerID) { this.answerID = properties.answerID }
            if (properties.cnt) { this.cnt = properties.cnt }
            if (properties.radioAnswers) { this.radioAnswers = []; properties.radioAnswers.forEach((value, index)=>{this.radioAnswers[index] = RadioStatistics.create(properties.radioAnswers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public answerID?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public cnt?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_customersvc_v1_RadioStatistics", "repeated")
    public radioAnswers?: RadioStatistics[] = []
}
export interface IQuestionStatistics {
    questionID?: string|null
    answers?: IAnswerStatistics[]
}
@protobuf.Type.d("tss_hall_customersvc_v1_QuestionStatistics")
export class QuestionStatistics extends protobuf.Message<IQuestionStatistics> {
    constructor(properties: Properties<IQuestionStatistics>) {
        super(properties);
        if (properties) {
            if (properties.questionID) { this.questionID = properties.questionID }
            if (properties.answers) { this.answers = []; properties.answers.forEach((value, index)=>{this.answers[index] = AnswerStatistics.create(properties.answers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public questionID?: string|null = ""
    @protobuf.Field.d(2, "tss_hall_customersvc_v1_AnswerStatistics", "repeated")
    public answers?: AnswerStatistics[] = []
}
export interface ICreateQuestionnaireReq {
    questionnaire?: IQuestionnaire
}
@protobuf.Type.d("tss_hall_customersvc_v1_CreateQuestionnaireReq")
export class CreateQuestionnaireReq extends protobuf.Message<ICreateQuestionnaireReq> {
    constructor(properties: Properties<ICreateQuestionnaireReq>) {
        super(properties);
        if (properties) {
            if (properties.questionnaire) { this.questionnaire = Questionnaire.create(properties.questionnaire) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_Questionnaire", "optional")
    public questionnaire?: Questionnaire|null
}
export interface ICreateQuestionnaireResp {
    questionnaire?: IQuestionnaire
}
@protobuf.Type.d("tss_hall_customersvc_v1_CreateQuestionnaireResp")
export class CreateQuestionnaireResp extends protobuf.Message<ICreateQuestionnaireResp> {
    constructor(properties: Properties<ICreateQuestionnaireResp>) {
        super(properties);
        if (properties) {
            if (properties.questionnaire) { this.questionnaire = Questionnaire.create(properties.questionnaire) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_Questionnaire", "optional")
    public questionnaire?: Questionnaire|null
}
export interface IGetQuestionnaireReq {
    id?: string|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_GetQuestionnaireReq")
export class GetQuestionnaireReq extends protobuf.Message<IGetQuestionnaireReq> {
    constructor(properties: Properties<IGetQuestionnaireReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
}
export interface IGetQuestionnaireResp {
    questionnaire?: IQuestionnaire
}
@protobuf.Type.d("tss_hall_customersvc_v1_GetQuestionnaireResp")
export class GetQuestionnaireResp extends protobuf.Message<IGetQuestionnaireResp> {
    constructor(properties: Properties<IGetQuestionnaireResp>) {
        super(properties);
        if (properties) {
            if (properties.questionnaire) { this.questionnaire = Questionnaire.create(properties.questionnaire) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_Questionnaire", "optional")
    public questionnaire?: Questionnaire|null
}
export interface IListQuestionnaireReq {
    page?: number|null
    pageSize?: number|null
    state?: tss_common_State|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_ListQuestionnaireReq")
export class ListQuestionnaireReq extends protobuf.Message<IListQuestionnaireReq> {
    constructor(properties: Properties<IListQuestionnaireReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.state) { this.state = properties.state }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_common_State, "optional", tss_common_State.StateUnknown)
    public state?: tss_common_State|null = tss_common_State.StateUnknown
}
export interface IListQuestionnaireResp {
    total?: number|null
    questionnaire?: IQuestionnaire[]
}
@protobuf.Type.d("tss_hall_customersvc_v1_ListQuestionnaireResp")
export class ListQuestionnaireResp extends protobuf.Message<IListQuestionnaireResp> {
    constructor(properties: Properties<IListQuestionnaireResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.questionnaire) { this.questionnaire = []; properties.questionnaire.forEach((value, index)=>{this.questionnaire[index] = Questionnaire.create(properties.questionnaire[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_customersvc_v1_Questionnaire", "repeated")
    public questionnaire?: Questionnaire[] = []
}
export interface IUpdateQuestionnaireReq {
    questionnaire?: IQuestionnaire
}
@protobuf.Type.d("tss_hall_customersvc_v1_UpdateQuestionnaireReq")
export class UpdateQuestionnaireReq extends protobuf.Message<IUpdateQuestionnaireReq> {
    constructor(properties: Properties<IUpdateQuestionnaireReq>) {
        super(properties);
        if (properties) {
            if (properties.questionnaire) { this.questionnaire = Questionnaire.create(properties.questionnaire) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_Questionnaire", "optional")
    public questionnaire?: Questionnaire|null
}
export interface IUpdateQuestionnaireResp {
    questionnaire?: IQuestionnaire
}
@protobuf.Type.d("tss_hall_customersvc_v1_UpdateQuestionnaireResp")
export class UpdateQuestionnaireResp extends protobuf.Message<IUpdateQuestionnaireResp> {
    constructor(properties: Properties<IUpdateQuestionnaireResp>) {
        super(properties);
        if (properties) {
            if (properties.questionnaire) { this.questionnaire = Questionnaire.create(properties.questionnaire) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_Questionnaire", "optional")
    public questionnaire?: Questionnaire|null
}
export interface IDeleteQuestionnaireReq {
    id?: string|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_DeleteQuestionnaireReq")
export class DeleteQuestionnaireReq extends protobuf.Message<IDeleteQuestionnaireReq> {
    constructor(properties: Properties<IDeleteQuestionnaireReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
}
export interface IGetQuestionnaireStatisticsReq {
    id?: string|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_GetQuestionnaireStatisticsReq")
export class GetQuestionnaireStatisticsReq extends protobuf.Message<IGetQuestionnaireStatisticsReq> {
    constructor(properties: Properties<IGetQuestionnaireStatisticsReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
}
export interface IGetQuestionnaireStatisticsResp {
    Statistics?: IQuestionStatistics[]
    answersCnt?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_GetQuestionnaireStatisticsResp")
export class GetQuestionnaireStatisticsResp extends protobuf.Message<IGetQuestionnaireStatisticsResp> {
    constructor(properties: Properties<IGetQuestionnaireStatisticsResp>) {
        super(properties);
        if (properties) {
            if (properties.Statistics) { this.Statistics = []; properties.Statistics.forEach((value, index)=>{this.Statistics[index] = QuestionStatistics.create(properties.Statistics[index]) as any})}
            if (properties.answersCnt) { this.answersCnt = properties.answersCnt }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_QuestionStatistics", "repeated")
    public Statistics?: QuestionStatistics[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public answersCnt?: number|null = 0
}
export interface ICreateQuestionnaireAnswerSheetReq {
    answerSheet?: IUserAnswerSheet
}
@protobuf.Type.d("tss_hall_customersvc_v1_CreateQuestionnaireAnswerSheetReq")
export class CreateQuestionnaireAnswerSheetReq extends protobuf.Message<ICreateQuestionnaireAnswerSheetReq> {
    constructor(properties: Properties<ICreateQuestionnaireAnswerSheetReq>) {
        super(properties);
        if (properties) {
            if (properties.answerSheet) { this.answerSheet = UserAnswerSheet.create(properties.answerSheet) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_UserAnswerSheet", "optional")
    public answerSheet?: UserAnswerSheet|null
}
export interface ICreateQuestionnaireAnswerSheetResp {
    code?: CODE|null
    haveAward?: boolean|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_CreateQuestionnaireAnswerSheetResp")
export class CreateQuestionnaireAnswerSheetResp extends protobuf.Message<ICreateQuestionnaireAnswerSheetResp> {
    constructor(properties: Properties<ICreateQuestionnaireAnswerSheetResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.haveAward) { this.haveAward = properties.haveAward }
        }
	}
    @protobuf.Field.d(1, CODE, "optional", CODE.OK)
    public code?: CODE|null = CODE.OK
    @protobuf.Field.d(2, "bool", "optional", false)
    public haveAward?: boolean|null = false
}
export interface IListQuestionnaireAnswersReq {
    id?: string|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_ListQuestionnaireAnswersReq")
export class ListQuestionnaireAnswersReq extends protobuf.Message<IListQuestionnaireAnswersReq> {
    constructor(properties: Properties<IListQuestionnaireAnswersReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListQuestionnaireAnswersResp {
    questionnaire?: IQuestionnaire
    sheets?: IUserAnswerSheet[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_ListQuestionnaireAnswersResp")
export class ListQuestionnaireAnswersResp extends protobuf.Message<IListQuestionnaireAnswersResp> {
    constructor(properties: Properties<IListQuestionnaireAnswersResp>) {
        super(properties);
        if (properties) {
            if (properties.questionnaire) { this.questionnaire = Questionnaire.create(properties.questionnaire) as any }
            if (properties.sheets) { this.sheets = []; properties.sheets.forEach((value, index)=>{this.sheets[index] = UserAnswerSheet.create(properties.sheets[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_Questionnaire", "optional")
    public questionnaire?: Questionnaire|null
    @protobuf.Field.d(2, "tss_hall_customersvc_v1_UserAnswerSheet", "repeated")
    public sheets?: UserAnswerSheet[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetUserAnswerSheetReq {
    questionnaireID?: string|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_GetUserAnswerSheetReq")
export class GetUserAnswerSheetReq extends protobuf.Message<IGetUserAnswerSheetReq> {
    constructor(properties: Properties<IGetUserAnswerSheetReq>) {
        super(properties);
        if (properties) {
            if (properties.questionnaireID) { this.questionnaireID = properties.questionnaireID }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public questionnaireID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserAnswerSheetResp {
    alreadyAnswer?: boolean|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_GetUserAnswerSheetResp")
export class GetUserAnswerSheetResp extends protobuf.Message<IGetUserAnswerSheetResp> {
    constructor(properties: Properties<IGetUserAnswerSheetResp>) {
        super(properties);
        if (properties) {
            if (properties.alreadyAnswer) { this.alreadyAnswer = properties.alreadyAnswer }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public alreadyAnswer?: boolean|null = false
}
export interface IFollowGiftConfig {
    award?: IAwardConfig
    acquireRule?: string|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_FollowGiftConfig")
export class FollowGiftConfig extends protobuf.Message<IFollowGiftConfig> {
    constructor(properties: Properties<IFollowGiftConfig>) {
        super(properties);
        if (properties) {
            if (properties.award) { this.award = AwardConfig.create(properties.award) as any }
            if (properties.acquireRule) { this.acquireRule = properties.acquireRule }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_AwardConfig", "optional")
    public award?: AwardConfig|null
    @protobuf.Field.d(2, "string", "optional", )
    public acquireRule?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public operator?: string|null = ""
}
export interface IGetFollowGiftConfigResp {
    code?: UserGiftStateErrorCode|null
    config?: IFollowGiftConfig
}
@protobuf.Type.d("tss_hall_customersvc_v1_GetFollowGiftConfigResp")
export class GetFollowGiftConfigResp extends protobuf.Message<IGetFollowGiftConfigResp> {
    constructor(properties: Properties<IGetFollowGiftConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.config) { this.config = FollowGiftConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, UserGiftStateErrorCode, "optional", UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown)
    public code?: UserGiftStateErrorCode|null = UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown
    @protobuf.Field.d(2, "tss_hall_customersvc_v1_FollowGiftConfig", "optional")
    public config?: FollowGiftConfig|null
}
export interface IUpsertFollowGiftConfigReq {
    config?: IFollowGiftConfig
}
@protobuf.Type.d("tss_hall_customersvc_v1_UpsertFollowGiftConfigReq")
export class UpsertFollowGiftConfigReq extends protobuf.Message<IUpsertFollowGiftConfigReq> {
    constructor(properties: Properties<IUpsertFollowGiftConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = FollowGiftConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_FollowGiftConfig", "optional")
    public config?: FollowGiftConfig|null
}
export interface IWealGiftConfig {
    award?: IAwardConfig
    acquireRule?: string|null
    name?: string|null
    periodType?: PeriodType|null
    periodCnt?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_WealGiftConfig")
export class WealGiftConfig extends protobuf.Message<IWealGiftConfig> {
    constructor(properties: Properties<IWealGiftConfig>) {
        super(properties);
        if (properties) {
            if (properties.award) { this.award = AwardConfig.create(properties.award) as any }
            if (properties.acquireRule) { this.acquireRule = properties.acquireRule }
            if (properties.name) { this.name = properties.name }
            if (properties.periodType) { this.periodType = properties.periodType }
            if (properties.periodCnt) { this.periodCnt = properties.periodCnt }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_AwardConfig", "optional")
    public award?: AwardConfig|null
    @protobuf.Field.d(2, "string", "optional", )
    public acquireRule?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, PeriodType, "optional", PeriodType.PeriodTypeUnknown)
    public periodType?: PeriodType|null = PeriodType.PeriodTypeUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public periodCnt?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public operator?: string|null = ""
}
export interface IGetWealGiftConfigResp {
    code?: UserGiftStateErrorCode|null
    config?: IWealGiftConfig
}
@protobuf.Type.d("tss_hall_customersvc_v1_GetWealGiftConfigResp")
export class GetWealGiftConfigResp extends protobuf.Message<IGetWealGiftConfigResp> {
    constructor(properties: Properties<IGetWealGiftConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.config) { this.config = WealGiftConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, UserGiftStateErrorCode, "optional", UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown)
    public code?: UserGiftStateErrorCode|null = UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown
    @protobuf.Field.d(2, "tss_hall_customersvc_v1_WealGiftConfig", "optional")
    public config?: WealGiftConfig|null
}
export interface IUpsertWealGiftConfigReq {
    config?: IWealGiftConfig
}
@protobuf.Type.d("tss_hall_customersvc_v1_UpsertWealGiftConfigReq")
export class UpsertWealGiftConfigReq extends protobuf.Message<IUpsertWealGiftConfigReq> {
    constructor(properties: Properties<IUpsertWealGiftConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = WealGiftConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_WealGiftConfig", "optional")
    public config?: WealGiftConfig|null
}
export interface IUserGiftState {
    uid?: number|null
    state?: UserGiftStateType|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_UserGiftState")
export class UserGiftState extends protobuf.Message<IUserGiftState> {
    constructor(properties: Properties<IUserGiftState>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.state) { this.state = properties.state }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, UserGiftStateType, "optional", UserGiftStateType.UserGiftStateTypeUnknown)
    public state?: UserGiftStateType|null = UserGiftStateType.UserGiftStateTypeUnknown
}
export interface IGetUserFollowGiftStateResp {
    code?: UserGiftStateErrorCode|null
    userState?: IUserGiftState
}
@protobuf.Type.d("tss_hall_customersvc_v1_GetUserFollowGiftStateResp")
export class GetUserFollowGiftStateResp extends protobuf.Message<IGetUserFollowGiftStateResp> {
    constructor(properties: Properties<IGetUserFollowGiftStateResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.userState) { this.userState = UserGiftState.create(properties.userState) as any }
        }
	}
    @protobuf.Field.d(1, UserGiftStateErrorCode, "optional", UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown)
    public code?: UserGiftStateErrorCode|null = UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown
    @protobuf.Field.d(2, "tss_hall_customersvc_v1_UserGiftState", "optional")
    public userState?: UserGiftState|null
}
export interface IGetUserWealGiftStateResp {
    code?: UserGiftStateErrorCode|null
    userState?: IUserGiftState
}
@protobuf.Type.d("tss_hall_customersvc_v1_GetUserWealGiftStateResp")
export class GetUserWealGiftStateResp extends protobuf.Message<IGetUserWealGiftStateResp> {
    constructor(properties: Properties<IGetUserWealGiftStateResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.userState) { this.userState = UserGiftState.create(properties.userState) as any }
        }
	}
    @protobuf.Field.d(1, UserGiftStateErrorCode, "optional", UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown)
    public code?: UserGiftStateErrorCode|null = UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown
    @protobuf.Field.d(2, "tss_hall_customersvc_v1_UserGiftState", "optional")
    public userState?: UserGiftState|null
}
export interface IAcquireFollowGiftResp {
    code?: UserGiftStateErrorCode|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_AcquireFollowGiftResp")
export class AcquireFollowGiftResp extends protobuf.Message<IAcquireFollowGiftResp> {
    constructor(properties: Properties<IAcquireFollowGiftResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, UserGiftStateErrorCode, "optional", UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown)
    public code?: UserGiftStateErrorCode|null = UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown
}
export interface IAcquireWealGiftResp {
    code?: UserGiftStateErrorCode|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_AcquireWealGiftResp")
export class AcquireWealGiftResp extends protobuf.Message<IAcquireWealGiftResp> {
    constructor(properties: Properties<IAcquireWealGiftResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, UserGiftStateErrorCode, "optional", UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown)
    public code?: UserGiftStateErrorCode|null = UserGiftStateErrorCode.UserGiftStateErrorCodeUnknown
}
export interface IUserReport {
    uid?: number|null
    reportedUid?: number|null
    reportedAvatar?: string|null
    reportedNickname?: string|null
    type?: ReportType[]
    gameID?: string|null
    createdAt?: number|null
    updatedAt?: number|null
    desc?: string|null
    tableKey?: string|null
    matchName?: string|null
    Id?: number|null
    reportStatus?: ReportStatus|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_UserReport")
export class UserReport extends protobuf.Message<IUserReport> {
    constructor(properties: Properties<IUserReport>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.reportedUid) { this.reportedUid = properties.reportedUid }
            if (properties.reportedAvatar) { this.reportedAvatar = properties.reportedAvatar }
            if (properties.reportedNickname) { this.reportedNickname = properties.reportedNickname }
            if (properties.type) { this.type = []; properties.type.forEach((value, index)=>{this.type[index] = properties.type[index]})}
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.tableKey) { this.tableKey = properties.tableKey }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.Id) { this.Id = properties.Id }
            if (properties.reportStatus) { this.reportStatus = properties.reportStatus }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public reportedUid?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public reportedAvatar?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public reportedNickname?: string|null = ""
    @protobuf.Field.d(5, ReportType, "repeated", ReportType.ReportTypeNone)
    public type?: ReportType[] = []
    @protobuf.Field.d(6, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(7, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public tableKey?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(12, "int64", "optional", 0)
    public Id?: number|null = 0
    @protobuf.Field.d(13, ReportStatus, "optional", ReportStatus.ReportStatusUnknown)
    public reportStatus?: ReportStatus|null = ReportStatus.ReportStatusUnknown
}
export interface ISearchUserReportReq {
    uid?: number|null
    reportedUid?: number|null
    type?: ReportType|null
    page?: number|null
    pageSize?: number|null
    sortBy?: string[]
    status?: ReportStatus|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_SearchUserReportReq")
export class SearchUserReportReq extends protobuf.Message<ISearchUserReportReq> {
    constructor(properties: Properties<ISearchUserReportReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.reportedUid) { this.reportedUid = properties.reportedUid }
            if (properties.type) { this.type = properties.type }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.sortBy) { this.sortBy = []; properties.sortBy.forEach((value, index)=>{this.sortBy[index] = properties.sortBy[index]})}
            if (properties.status) { this.status = properties.status }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public reportedUid?: number|null = 0
    @protobuf.Field.d(3, ReportType, "optional", ReportType.ReportTypeNone)
    public type?: ReportType|null = ReportType.ReportTypeNone
    @protobuf.Field.d(4, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(6, "string", "repeated", [])
    public sortBy?: string[] = []
    @protobuf.Field.d(7, ReportStatus, "optional", ReportStatus.ReportStatusUnknown)
    public status?: ReportStatus|null = ReportStatus.ReportStatusUnknown
}
export interface ISearchUserReportResp {
    reports?: IUserReport[]
    totalNum?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_SearchUserReportResp")
export class SearchUserReportResp extends protobuf.Message<ISearchUserReportResp> {
    constructor(properties: Properties<ISearchUserReportResp>) {
        super(properties);
        if (properties) {
            if (properties.reports) { this.reports = []; properties.reports.forEach((value, index)=>{this.reports[index] = UserReport.create(properties.reports[index]) as any})}
            if (properties.totalNum) { this.totalNum = properties.totalNum }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_UserReport", "repeated")
    public reports?: UserReport[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalNum?: number|null = 0
}
export interface ICreateUserReportReq {
    userReport?: IUserReport
}
@protobuf.Type.d("tss_hall_customersvc_v1_CreateUserReportReq")
export class CreateUserReportReq extends protobuf.Message<ICreateUserReportReq> {
    constructor(properties: Properties<ICreateUserReportReq>) {
        super(properties);
        if (properties) {
            if (properties.userReport) { this.userReport = UserReport.create(properties.userReport) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_UserReport", "optional")
    public userReport?: UserReport|null
}
export interface IOperate {
    id?: number|null
    reportID?: number|null
    user?: string|null
    descript?: string|null
    content?: string|null
    createAt?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_Operate")
export class Operate extends protobuf.Message<IOperate> {
    constructor(properties: Properties<IOperate>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.reportID) { this.reportID = properties.reportID }
            if (properties.user) { this.user = properties.user }
            if (properties.descript) { this.descript = properties.descript }
            if (properties.content) { this.content = properties.content }
            if (properties.createAt) { this.createAt = properties.createAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public reportID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public user?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public descript?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public createAt?: number|null = 0
}
export interface ISendSysMailReq {
    reportID?: number|null
    sysMail?: tss_hall_mail_v2_ISendSysMailReq
    operate?: IOperate
}
@protobuf.Type.d("tss_hall_customersvc_v1_SendSysMailReq")
export class SendSysMailReq extends protobuf.Message<ISendSysMailReq> {
    constructor(properties: Properties<ISendSysMailReq>) {
        super(properties);
        if (properties) {
            if (properties.reportID) { this.reportID = properties.reportID }
            if (properties.sysMail) { this.sysMail = tss_hall_mail_v2_SendSysMailReq.create(properties.sysMail) as any }
            if (properties.operate) { this.operate = Operate.create(properties.operate) as any }
        }
	}
    @protobuf.Field.d(1, "uint32", "optional", 0)
    public reportID?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_mail_v2_SendSysMailReq", "optional")
    public sysMail?: tss_hall_mail_v2_SendSysMailReq|null
    @protobuf.Field.d(3, "tss_hall_customersvc_v1_Operate", "optional")
    public operate?: Operate|null
}
export interface IListOperateReq {
    reportID?: number|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_ListOperateReq")
export class ListOperateReq extends protobuf.Message<IListOperateReq> {
    constructor(properties: Properties<IListOperateReq>) {
        super(properties);
        if (properties) {
            if (properties.reportID) { this.reportID = properties.reportID }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public reportID?: number|null = 0
    @protobuf.Field.d(2, "uint32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "uint32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListOperateResp {
    list?: IOperate[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_customersvc_v1_ListOperateResp")
export class ListOperateResp extends protobuf.Message<IListOperateResp> {
    constructor(properties: Properties<IListOperateResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = Operate.create(properties.list[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_customersvc_v1_Operate", "repeated")
    public list?: Operate[] = []
    @protobuf.Field.d(2, "uint32", "optional", 0)
    public total?: number|null = 0
}
export interface IModifyReportStatusReq {
    reportId?: number|null
    status?: ReportStatus|null
    operate?: IOperate
}
@protobuf.Type.d("tss_hall_customersvc_v1_ModifyReportStatusReq")
export class ModifyReportStatusReq extends protobuf.Message<IModifyReportStatusReq> {
    constructor(properties: Properties<IModifyReportStatusReq>) {
        super(properties);
        if (properties) {
            if (properties.reportId) { this.reportId = properties.reportId }
            if (properties.status) { this.status = properties.status }
            if (properties.operate) { this.operate = Operate.create(properties.operate) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public reportId?: number|null = 0
    @protobuf.Field.d(2, ReportStatus, "optional", ReportStatus.ReportStatusUnknown)
    public status?: ReportStatus|null = ReportStatus.ReportStatusUnknown
    @protobuf.Field.d(3, "tss_hall_customersvc_v1_Operate", "optional")
    public operate?: Operate|null
}
export interface IBatchModifyReportStatusReq {
    reportIds?: number[]
    status?: ReportStatus|null
    operate?: IOperate
}
@protobuf.Type.d("tss_hall_customersvc_v1_BatchModifyReportStatusReq")
export class BatchModifyReportStatusReq extends protobuf.Message<IBatchModifyReportStatusReq> {
    constructor(properties: Properties<IBatchModifyReportStatusReq>) {
        super(properties);
        if (properties) {
            if (properties.reportIds) { this.reportIds = []; properties.reportIds.forEach((value, index)=>{this.reportIds[index] = properties.reportIds[index]})}
            if (properties.status) { this.status = properties.status }
            if (properties.operate) { this.operate = Operate.create(properties.operate) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public reportIds?: number[] = []
    @protobuf.Field.d(2, ReportStatus, "optional", ReportStatus.ReportStatusUnknown)
    public status?: ReportStatus|null = ReportStatus.ReportStatusUnknown
    @protobuf.Field.d(3, "tss_hall_customersvc_v1_Operate", "optional")
    public operate?: Operate|null
}
class $Customersvc extends RpcService {
    async CreateQuestionnaire(req: ICreateQuestionnaireReq, params?: RpcParams) : Promise<{err:number, resp:ICreateQuestionnaireResp}> {
        let data = CreateQuestionnaireReq.create(req)
        this.onBeforeReq("CreateQuestionnaire", data, params)
        const buffer = CreateQuestionnaireReq.encode(data).finish()
        let [err, pack] = await this.call("CreateQuestionnaire", buffer, params)
        if (err) {
            this.onBeforeResp("CreateQuestionnaire", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateQuestionnaireResp.decode(pack) as any
            this.onBeforeResp("CreateQuestionnaire", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetQuestionnaire(req: IGetQuestionnaireReq, params?: RpcParams) : Promise<{err:number, resp:IGetQuestionnaireResp}> {
        let data = GetQuestionnaireReq.create(req)
        this.onBeforeReq("GetQuestionnaire", data, params)
        const buffer = GetQuestionnaireReq.encode(data).finish()
        let [err, pack] = await this.call("GetQuestionnaire", buffer, params)
        if (err) {
            this.onBeforeResp("GetQuestionnaire", err)
            return {err: err, resp: null}
        } else {
            let resp = GetQuestionnaireResp.decode(pack) as any
            this.onBeforeResp("GetQuestionnaire", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListQuestionnaire(req: IListQuestionnaireReq, params?: RpcParams) : Promise<{err:number, resp:IListQuestionnaireResp}> {
        let data = ListQuestionnaireReq.create(req)
        this.onBeforeReq("ListQuestionnaire", data, params)
        const buffer = ListQuestionnaireReq.encode(data).finish()
        let [err, pack] = await this.call("ListQuestionnaire", buffer, params)
        if (err) {
            this.onBeforeResp("ListQuestionnaire", err)
            return {err: err, resp: null}
        } else {
            let resp = ListQuestionnaireResp.decode(pack) as any
            this.onBeforeResp("ListQuestionnaire", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateQuestionnaire(req: IUpdateQuestionnaireReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateQuestionnaireResp}> {
        let data = UpdateQuestionnaireReq.create(req)
        this.onBeforeReq("UpdateQuestionnaire", data, params)
        const buffer = UpdateQuestionnaireReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateQuestionnaire", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateQuestionnaire", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateQuestionnaireResp.decode(pack) as any
            this.onBeforeResp("UpdateQuestionnaire", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteQuestionnaire(req: IDeleteQuestionnaireReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteQuestionnaireReq.create(req)
        this.onBeforeReq("DeleteQuestionnaire", data, params)
        const buffer = DeleteQuestionnaireReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteQuestionnaire", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteQuestionnaire", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteQuestionnaire", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetQuestionnaireStatistics(req: IGetQuestionnaireStatisticsReq, params?: RpcParams) : Promise<{err:number, resp:IGetQuestionnaireStatisticsResp}> {
        let data = GetQuestionnaireStatisticsReq.create(req)
        this.onBeforeReq("GetQuestionnaireStatistics", data, params)
        const buffer = GetQuestionnaireStatisticsReq.encode(data).finish()
        let [err, pack] = await this.call("GetQuestionnaireStatistics", buffer, params)
        if (err) {
            this.onBeforeResp("GetQuestionnaireStatistics", err)
            return {err: err, resp: null}
        } else {
            let resp = GetQuestionnaireStatisticsResp.decode(pack) as any
            this.onBeforeResp("GetQuestionnaireStatistics", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListQuestionnaireAnswers(req: IListQuestionnaireAnswersReq, params?: RpcParams) : Promise<{err:number, resp:IListQuestionnaireAnswersResp}> {
        let data = ListQuestionnaireAnswersReq.create(req)
        this.onBeforeReq("ListQuestionnaireAnswers", data, params)
        const buffer = ListQuestionnaireAnswersReq.encode(data).finish()
        let [err, pack] = await this.call("ListQuestionnaireAnswers", buffer, params)
        if (err) {
            this.onBeforeResp("ListQuestionnaireAnswers", err)
            return {err: err, resp: null}
        } else {
            let resp = ListQuestionnaireAnswersResp.decode(pack) as any
            this.onBeforeResp("ListQuestionnaireAnswers", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateQuestionnaireAnswerSheet(req: ICreateQuestionnaireAnswerSheetReq, params?: RpcParams) : Promise<{err:number, resp:ICreateQuestionnaireAnswerSheetResp}> {
        let data = CreateQuestionnaireAnswerSheetReq.create(req)
        this.onBeforeReq("CreateQuestionnaireAnswerSheet", data, params)
        const buffer = CreateQuestionnaireAnswerSheetReq.encode(data).finish()
        let [err, pack] = await this.call("CreateQuestionnaireAnswerSheet", buffer, params)
        if (err) {
            this.onBeforeResp("CreateQuestionnaireAnswerSheet", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateQuestionnaireAnswerSheetResp.decode(pack) as any
            this.onBeforeResp("CreateQuestionnaireAnswerSheet", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserAnswerSheet(req: IGetUserAnswerSheetReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserAnswerSheetResp}> {
        let data = GetUserAnswerSheetReq.create(req)
        this.onBeforeReq("GetUserAnswerSheet", data, params)
        const buffer = GetUserAnswerSheetReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserAnswerSheet", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserAnswerSheet", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserAnswerSheetResp.decode(pack) as any
            this.onBeforeResp("GetUserAnswerSheet", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetFollowGiftConfig(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetFollowGiftConfigResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetFollowGiftConfig", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetFollowGiftConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetFollowGiftConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetFollowGiftConfigResp.decode(pack) as any
            this.onBeforeResp("GetFollowGiftConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AcquireFollowGift(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IAcquireFollowGiftResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("AcquireFollowGift", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("AcquireFollowGift", buffer, params)
        if (err) {
            this.onBeforeResp("AcquireFollowGift", err)
            return {err: err, resp: null}
        } else {
            let resp = AcquireFollowGiftResp.decode(pack) as any
            this.onBeforeResp("AcquireFollowGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserFollowGiftState(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetUserFollowGiftStateResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetUserFollowGiftState", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetUserFollowGiftState", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserFollowGiftState", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserFollowGiftStateResp.decode(pack) as any
            this.onBeforeResp("GetUserFollowGiftState", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetWealGiftConfig(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetWealGiftConfigResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetWealGiftConfig", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetWealGiftConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetWealGiftConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetWealGiftConfigResp.decode(pack) as any
            this.onBeforeResp("GetWealGiftConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AcquireWealGift(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IAcquireWealGiftResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("AcquireWealGift", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("AcquireWealGift", buffer, params)
        if (err) {
            this.onBeforeResp("AcquireWealGift", err)
            return {err: err, resp: null}
        } else {
            let resp = AcquireWealGiftResp.decode(pack) as any
            this.onBeforeResp("AcquireWealGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserWealGiftState(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetUserWealGiftStateResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetUserWealGiftState", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetUserWealGiftState", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserWealGiftState", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserWealGiftStateResp.decode(pack) as any
            this.onBeforeResp("GetUserWealGiftState", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpsertFollowGiftConfig(req: IUpsertFollowGiftConfigReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpsertFollowGiftConfigReq.create(req)
        this.onBeforeReq("UpsertFollowGiftConfig", data, params)
        const buffer = UpsertFollowGiftConfigReq.encode(data).finish()
        let [err, pack] = await this.call("UpsertFollowGiftConfig", buffer, params)
        if (err) {
            this.onBeforeResp("UpsertFollowGiftConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpsertFollowGiftConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpsertWealGiftConfig(req: IUpsertWealGiftConfigReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpsertWealGiftConfigReq.create(req)
        this.onBeforeReq("UpsertWealGiftConfig", data, params)
        const buffer = UpsertWealGiftConfigReq.encode(data).finish()
        let [err, pack] = await this.call("UpsertWealGiftConfig", buffer, params)
        if (err) {
            this.onBeforeResp("UpsertWealGiftConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpsertWealGiftConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateUserReport(req: ICreateUserReportReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CreateUserReportReq.create(req)
        this.onBeforeReq("CreateUserReport", data, params)
        const buffer = CreateUserReportReq.encode(data).finish()
        let [err, pack] = await this.call("CreateUserReport", buffer, params)
        if (err) {
            this.onBeforeResp("CreateUserReport", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CreateUserReport", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SearchUserReport(req: ISearchUserReportReq, params?: RpcParams) : Promise<{err:number, resp:ISearchUserReportResp}> {
        let data = SearchUserReportReq.create(req)
        this.onBeforeReq("SearchUserReport", data, params)
        const buffer = SearchUserReportReq.encode(data).finish()
        let [err, pack] = await this.call("SearchUserReport", buffer, params)
        if (err) {
            this.onBeforeResp("SearchUserReport", err)
            return {err: err, resp: null}
        } else {
            let resp = SearchUserReportResp.decode(pack) as any
            this.onBeforeResp("SearchUserReport", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetQuestionnaireForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetQuestionnaireForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetQuestionnaireForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetQuestionnaireForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetQuestionnaireForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SendSysMail(req: ISendSysMailReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SendSysMailReq.create(req)
        this.onBeforeReq("SendSysMail", data, params)
        const buffer = SendSysMailReq.encode(data).finish()
        let [err, pack] = await this.call("SendSysMail", buffer, params)
        if (err) {
            this.onBeforeResp("SendSysMail", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SendSysMail", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AddOperate(req: IOperate, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = Operate.create(req)
        this.onBeforeReq("AddOperate", data, params)
        const buffer = Operate.encode(data).finish()
        let [err, pack] = await this.call("AddOperate", buffer, params)
        if (err) {
            this.onBeforeResp("AddOperate", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("AddOperate", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListOperate(req: IListOperateReq, params?: RpcParams) : Promise<{err:number, resp:IListOperateResp}> {
        let data = ListOperateReq.create(req)
        this.onBeforeReq("ListOperate", data, params)
        const buffer = ListOperateReq.encode(data).finish()
        let [err, pack] = await this.call("ListOperate", buffer, params)
        if (err) {
            this.onBeforeResp("ListOperate", err)
            return {err: err, resp: null}
        } else {
            let resp = ListOperateResp.decode(pack) as any
            this.onBeforeResp("ListOperate", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ModifyReportStatus(req: IModifyReportStatusReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ModifyReportStatusReq.create(req)
        this.onBeforeReq("ModifyReportStatus", data, params)
        const buffer = ModifyReportStatusReq.encode(data).finish()
        let [err, pack] = await this.call("ModifyReportStatus", buffer, params)
        if (err) {
            this.onBeforeResp("ModifyReportStatus", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ModifyReportStatus", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchModifyReportStatus(req: IBatchModifyReportStatusReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchModifyReportStatusReq.create(req)
        this.onBeforeReq("BatchModifyReportStatus", data, params)
        const buffer = BatchModifyReportStatusReq.encode(data).finish()
        let [err, pack] = await this.call("BatchModifyReportStatus", buffer, params)
        if (err) {
            this.onBeforeResp("BatchModifyReportStatus", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchModifyReportStatus", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Customersvc = new $Customersvc({
    name: "tss.hall.customersvc.v1",
})