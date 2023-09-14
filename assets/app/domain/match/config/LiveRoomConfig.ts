export default class LiveRoomConfig {
    
    bg:string;
    
    title:string;
    
    needToken:number;
    
    isVisible:number;
    
    type:number;
    
    reset() {
        this.bg         = ""
        this.title      = ""
        this.needToken  = 0
        this.isVisible  = 0
        this.type       = 0
    }

    init(data) {
        this.bg         = data.bg
        this.title      = data.title
        this.needToken  = data.needToken
        this.isVisible  = data.isVisible
        this.type       = data.type
    }
}