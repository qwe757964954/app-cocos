
async function create_node( name : string, components : string[]){
    let uuids = Editor.Selection.getSelected("node")
    for (let uuid of uuids) {
        let params = {
            parent: uuid,
            name: name,
            canvasRequired: true
        }
        let nuuid = await Editor.Message.request("scene", "create-node", params)
        for(let com of components)
        {
            await Editor.Message.request("scene", 'create-component', {
                uuid: nuuid,
                component: com
            })
        }
    }
}

export async function create_xLabel_node() {
    await create_node("XLabel", ["XLabel"])
}

export async function create_tableview_node() {
    await create_node("TableView", ["TableView"])
}

export async function create_xpageview_node() {
    await create_node("XPageView", ["XPageView"])
}

export async function create_yogaflex_node() {
    await create_node("YogaFlex", ["YogaFlex"])
}