import { EntryConfig } from "./EntryConfig";
import { InnerConfig } from "./InnerConfig";

export default class SpecConfig {
    
    creator:number;
    
    time : any;
    
    entry = new EntryConfig();
    
    game : any;
    
    robot : any;
    
    observe : any;
    
    fastSNG : any;
    
    match = new InnerConfig();
    
    viewInfo : any;
    
    type:number;
    
    subMatchType:number;
    
    schedulerID:number;
    
    cycleMode:number;
    
    MaxVersion:number;
    
    MinVersion:number;
    
    applicationId:string;
    
    showSeq:number;
    
    isOffSitePush:number;
    
    applicationIds:string[] = [];
    
    listApplicationIds:string[] = [];
    
    preventCheat : any;
    
    promptJump : any;
    
    delayPlay : any;
    
    schedulerType:number;
    
    playRhythm : any;
    
    refactorVer:number;
    
    appRemindCfg : any;

    reset() {
        this.creator             =   0
        this.time                =   {}
        this.game                =   {}
        this.robot               =   {}
        this.observe             =   {}
        this.fastSNG             =   {}
        this.viewInfo            =   {}
        this.type                =   0
        this.subMatchType        =   0
        this.schedulerID         =   0
        this.cycleMode           =   0
        this.MaxVersion          =   0
        this.MinVersion          =   0
        this.applicationId       =   ""
        this.showSeq             =   0
        this.isOffSitePush       =   0
        this.applicationIds      =   []
        this.listApplicationIds  =   []
        this.preventCheat        =   {}
        this.promptJump          =   {}
        this.delayPlay           =   {}
        this.schedulerType       =   0
        this.playRhythm          =   {}
        this.refactorVer         =   0
        this.appRemindCfg        =   {}

        this.match.reset()
        this.entry.reset()
    }

    init(data) {
        this.creator             =   data.creator
        this.time                =   data.time
        this.game                =   data.game
        this.robot               =   data.robot
        this.observe             =   data.observe
        this.fastSNG             =   data.fastSNG
        this.viewInfo            =   data.viewInfo
        this.type                =   data.type
        this.subMatchType        =   data.subMatchType
        this.schedulerID         =   data.schedulerID
        this.cycleMode           =   data.cycleMode
        this.MaxVersion          =   data.MaxVersion
        this.MinVersion          =   data.MinVersion
        this.applicationId       =   data.applicationId
        this.showSeq             =   data.showSeq
        this.isOffSitePush       =   data.isOffSitePush
        this.applicationIds      =   data.applicationIds
        this.listApplicationIds  =   data.listApplicationIds
        this.preventCheat        =   data.preventCheat
        this.promptJump          =   data.promptJump
        this.delayPlay           =   data.delayPlay
        this.schedulerType       =   data.schedulerType
        this.playRhythm          =   data.playRhythm
        this.refactorVer         =   data.refactorVer
        this.appRemindCfg        =   data.appRemindCfg

        this.match.update(data.match)
        this.entry.update(data.entry)
    }
}