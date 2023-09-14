export enum RelationEvent {
    ON_NOTIFY_RELATION_CHANGE = "ON_NOTIFY_RELATION_CHANGE",
    ON_NOTIFY_RELATION_SYNC_FINISH = "ON_NOTIFY_RELATION_SYNC_FINISH",
    ON_NOTIFY_APPLY_SYNC_FINISH = "ON_NOTIFY_APPLY_SYNC_FINISH",
    ON_NOTIFY_APPLY_CHANGE = "ON_NOTIFY_APPLY_CHANGE",
}

export enum RelateType {

    UnknownType = 0,

    Fans = 1,

    Follow = 2,

    Black = 3,

    Blacked = 4,

    Friend = 5,

    Friended = 6,
}

export enum Operate {

    UnknownOperate = 0,

    Add = 1,

    Del = 2,

}