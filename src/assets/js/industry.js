let obj = 'taskcenter'
// 行业类型
export const role = {
    taskPage:obj + '/zgtindtype/page',//分页查询
    delete:obj +'/zgtindtype/delete',//删除
    modification:obj +'/zgtindtype/edit',//修改
    add:obj +'/zgtindtype/add'//添加
}
// 任务管理
export const task ={
    page:obj +'/zgtask/page',//分页查询
    add:obj +'/zgtask/add',//添加
    delect:obj +'/zgtask/delete',//删除
    batchdelect:obj +'/zgtask/delete-batch',//批量删除
    editor:obj +'/zgtask/edit',
}
// 任务类型管理
export const type ={
    page:obj +'/zgtasktype/page',//分页查询
    add:obj +'/zgtasktype/add',//添加
    delect:obj +'/zgtasktype/delete',//删除
    batchdelect:obj +'/zgtasktype/delete-batch',//批量删除
    editor:obj +'/zgtask/edit',//修改
}
// 任务附件
export const attachment ={
    page:obj +'/zgtaskattach/page',//分页查询
    add:obj +'/zgtaskattach/add',//添加
    delect:obj +'/zgtaskattach/delete',//删除
    batchdelect:obj +'/zgtaskattach/delete-batch',//批量删除
    editor:obj +'/zgtaskattach/edit',//修改
}
//任务订单
export const order ={
    page:obj +'/zgtaskorder/page',//分页查询
    add:obj +'/zgtaskorder/add',//添加
    delect:obj +'/zgtaskorder/delete',//删除
    batchdelect:obj +'/zgtaskorder/delete-batch',//批量删除
    editor:obj +'/zgtaskorder/edit',//修改
}