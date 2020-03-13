let obj = 'messagecenter'

// 模板类型
export const msgTemplate = {
    tempPage: obj + '/zgmsgtemplate/page',//查get
    tempAdd: obj + '/zgmsgtemplate/add',//增post
    qq:obj + '/zgmsgtemplate/msg-types',//消息类型
    business: obj+'/zgmsgtemplate/bus-codes',//业务编码
    tempDelete: obj + '/zgmsgtemplate/delete',//删delete
    tempEdit: obj + '/zgmsgtemplate/edit',//修改put
    tempBach: obj + '/zgmsgtemplate/delete-batch',//批量删除delete
}
// 消息日志
export const msglog = {
        logPage: obj + '/zgmsglog/page',//查get
        logDelete: obj + '/zgmsglog/delete',//删delete
        logBach: obj + '/zgmsglog/delete-batch',//批量删除delete
    }