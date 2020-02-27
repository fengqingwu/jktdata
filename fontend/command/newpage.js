var fs = require("fs");
var config = require("./config.js");
var path = require("path");
var addNewPage = function (pageName = "") {
    if ("" == pageName || pageName.constructor != String) {
        console.error("请输入文件名")
        return;
    } else {
        console.log("add Page done")
        var file = path.resolve(config.rootPath, "./src/views/pages/" + pageName + '.vue');
        var data = `// command created page ${pageName} 
<template>
<div class="page-${pageName}">
    <h1>${pageName}</h1>
</div>
</template>
<script>
export default{
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>
<style lang="scss">
.page-${pageName}{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
</style>
        `
        //'a'
        fs.writeFile(file, data, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (err) {
            if (err) {
                console.log("文件写入失败", file)
            } else {
                console.log("文件写入成功", file);

            }

        })
    }
};

module.exports = addNewPage;