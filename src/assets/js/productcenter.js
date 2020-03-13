let obj = 'productcenter';
export const clssify = {
    clssifyPage: obj + '/clssify/page',//分页查询新闻分类get
    clssifyAdd: obj + '/clssify/add',//添加post
    clssifyDelete: obj + '/clssify/delete',//删除delete
    clssifyEdit: obj + '/clssify/edit',//修改put
    uppate: obj + '/clssify/uppate-status',//禁用/启用商品分类状态
    // typeBach: obj + '/clssify/delete-batch',//批量删除delete
};
export const attr = {
    attrPage: obj + '/attr/page',//分页查询新闻分类get
    attrAdd: obj + '/attr/batch-add',//添加post
    // attrDelete: obj + '/attr/delete',//删除delete
    attrEdit: obj + '/attr/upd-attr',//修改put
    // uppate: obj + '/attr/uppate-status',//禁用/启用商品分类状态
    attrBach: obj + '/attr/del-attr',//批量删除delete
}

export const spec = {
    pagespec: obj + '/spec/page',//分页查询商品规格get
    addspec: obj + '/spec/add',//添加post
     // attrDelete: obj + '/attr/delete',//删除delete
    editspec: obj + '/spec/update',//修改put
    deletespec: obj + '/spec/del-batch',//批量删除delete
}
export const parameter = {
    page: obj +'/parameter/page',//分页查询商品参数
    amend: obj +'/parameter/update',//修改商品参数
    add: obj +'/parameter/add', //添加
    delete: obj +'/parameter/del-batch',//删除
}
// 商品标签
export const label = {
    labelPage: obj + '/label/page',//分页查询商品标签get
    labelAdd: obj + '/label/add',//添加post
    labelDelete: obj + '/label/delete',//删除delete
    labelEdit: obj + '/label/edit',//修改put
    labelBatch: obj + '/label/delete-batch',//批量删除delete
}