module.exports = function ({ types: t }) {
    return {
        visitor: {
            ImportDeclaration(path, { opts }) {

                if(path.node.source.value!=opts.lib) return;
                let node = path.node;
                let spc = node.specifiers;
                
                //判断是否为按需引入
                if(spc[0].type ==='ImportDefaultSpecifier') {
                    return 
                }
                let arr = [];

                spc.forEach((item,index)=>{
                  
                    if(opts.cssPath) {
                        let cssPath = t.stringLiteral(opts.cssPath.replace(/\{key\}/ig, item.imported.name));
                        // import from csspath
                        arr.push(t.importDeclaration([], cssPath));
                    }
                    if(opts.jsPath) {
                        // 按需引入时的改写js路径
                        let jsPath = t.stringLiteral(opts.jsPath);
                        // import {xxx} from jsPath;
                        let jsData = t.importDeclaration([
                            t.importSpecifier(item.local, item.imported),
                        ], jsPath)
                        arr.push(jsData);
                    }
                })
                path.replaceWithMultiple(arr);

            }
        }
    }
}