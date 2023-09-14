import { PBRegularCommon } from "../code/code";
import { Asset } from "./PrizeConfig";

export class EntryUserRoleLimit {
    type = PBRegularCommon.EntryUserRuleTypeUnknown;
    threshold = 0;
    thresholdMax = 0;
    isOtherRole = false;
    otherRole : EntryUserRoleLimit[] = []

    reset() {
        this.type = PBRegularCommon.EntryUserRuleTypeUnknown;
        this.threshold = 0;
        this.thresholdMax = 0;
        this.isOtherRole = false;

        this.otherRole = [];
    }

    update(data) {
        if (!data) return;

        this.type = data.type;
        this.threshold = data.threshold;
        this.thresholdMax = data.thresholdMax;
        this.isOtherRole = data.isOtherRole;

        this.otherRole = [];
        if (data.otherRole) {
            for (let i in data.otherRole) {
                const item = new EntryUserRoleLimit();
                item.update(data.otherRole[i]);
                this.otherRole.push(item);
            }
        }
    }
}

class EntryCancelConfig {
    isEnabled = false;
    deadline = 0;

    reset() {
        this.isEnabled = false;
        this.deadline = 0;
    }

    update(data) {
        if (!data) return;

        this.isEnabled = data.isEnabled;
        this.deadline = data.deadline;
    }
}

//-----------------------EntryNodeConfig----------------------
export class EntryNodeConfig {
    id = 0;
    type = PBRegularCommon.EntryNodeTypeUnknown;
    nodes : EntryNodeConfig[] = [];
    asset : Asset = new Asset();
    threshold = 0;
    sign = ">=";

    reset() {
        this.id = 0;
        this.type = PBRegularCommon.EntryNodeTypeUnknown;
        this.threshold = 0;
        this.sign = ">=";
        
        this.asset.reset();
        this.nodes = [];
    }

    update(data) {
        if (!data) return;

        this.id = data.id;
        this.type = data.type;
        this.threshold = data.threshold;
        this.sign = data.sign;

        this.asset.update(data.asset)

        this.nodes = [];
        if (data.nodes) {
            for (let i in data.nodes) {
                const item = new EntryNodeConfig();
                item.update(data.nodes[i]);
                this.nodes.push(item);
            }
        }
    }
}

//-----------------------EntryConfig----------------------
export class EntryConfig {
    isEnabled = false;
    isBelongCreator = false;
    isCanUseWealFreeCount = false;

    node = new EntryNodeConfig();
    cancel = new EntryCancelConfig();
    userRole = new EntryUserRoleLimit();

    reset() {
        this.isEnabled = null;
        this.isBelongCreator = null;
        this.isCanUseWealFreeCount = null;

        this.node.reset();
        this.cancel.reset();
        this.userRole.reset();
    }

    update(data) {
        if (!data) return;

        this.isEnabled = data.isEnabled;
        this.isBelongCreator = data.isBelongCreator;
        this.isCanUseWealFreeCount = data.isCanUseWealFreeCount;

        this.node.update(data.node);
        this.cancel.update(data.cancel);
        this.userRole.update(data.userRole);
    }
}