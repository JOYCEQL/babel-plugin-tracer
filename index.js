


module.exports = function ({ types: t }) {
    return {
        visitor: {
            ImportDeclaration(path, { opts }) {
                // 判断是否引入指定组件库
                if(path.node.source.value!=opts.lib) return;
                let node = path.node;
                let spec = node.specifiers;
                let arr = [];
                spec.forEach((item,index)=>{
                    //非按需引入
                    if(item.type ==='ImportDefaultSpecifier'){
                        return
                    }
                    if(opts.cssPath) {
                        let cssPath = t.stringLiteral(opts.cssPath.replace(/\{key\}/ig, item.imported.name));
                        // 解析成 import from csspath
                        arr.push(t.importDeclaration([], cssPath));
                    }
                    if(opts.jsPath) {
                        let jsPath = t.stringLiteral(opts.jsPath);
                        // import xxx from jsPath
                        let jsData = t.importDeclaration([
                            t.importDefaultSpecifier(
                                t.identifier(item.imported.name)
                            )
                        ], jsPath)
                        arr.push(jsData);
                    }
                })
                
                path.replaceWithMultiple(arr);

            }
        }
    }
}