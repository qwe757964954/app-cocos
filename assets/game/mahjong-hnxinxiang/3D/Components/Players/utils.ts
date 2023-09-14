import { Node,MeshRenderer} from 'cc';
import { CardInfo } from './cardConfigs';

export function getIconValue(value: number) 
{
    let numberValue  = value >> 8;

    let numebrString = numberValue.toString(16)

    // console.log(numebrString)

    return parseInt(numebrString, 10) ;
}

export function setSymbol(mjNode: Node, cardValue: number)
{
    let iconValue = getIconValue(cardValue)
    // console.log("iconValueiconValue    ",iconValue)
    let iconTexcoord = CardInfo[iconValue] 
    // console.log("iconTexcoord     ",iconTexcoord) 
    let cubeNode = mjNode.getChildByName("Cube")
    // console.log(cubeNode)
    let meshRenderCom = cubeNode.getComponent(MeshRenderer)
    // material = meshRenderCom.getSharedMaterial(1)
    // material = meshRenderCom.getRenderMaterial(1)
    let material = meshRenderCom.getMaterialInstance(1)
    material.setProperty('tilingOffset', iconTexcoord);
}

