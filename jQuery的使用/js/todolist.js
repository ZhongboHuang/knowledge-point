$(function () {
    // alert(11);
    // 1. 按下回车 把完整数据存储到本地存储里面
    // 存储的数据格式 var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function (event) {
        if ($(this).val() === "") {
            alert("请输入你需要的操作")
        } else {
            if (event.keyCode === 13) {
                // 读取本地数据
                var local = getData();
                // 将最新的数据追加给local数组
                local.push({
                    title: $(this).val(),
                    done: false
                });
                // 将最新的数组存储到本地
                saveData(local);
                // 将数据渲染到页面上
                load();
                // 清空输入框
                $("#title").val("");
            }
        }

    });
    // 点击图标删除当前数据
    $("ol, ul").on("click", "a", function () {
        // 获取数据
        var data = getData();
        // console.log(data);
        // 修改数据
        // 首先要知道点击的是哪条数据 再进行操作
        var index = $(this).attr("id");
        // console.log(index);
        data.splice(index, 1);
        // 存储到本地
        saveData(data);
        // 渲染页面
        load();
    });
    // 可进行和已完成的操作
    $("ol, ul").on("click", "input", function () {
        // 获取数据
        var data = getData();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        // console.log(index);
        data[index].done = $(this).prop("checked");
        // 存储到本地
        saveData(data);
        // 渲染页面
        load();
    })
    // 获取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 获取的data为字符串 但我们需要的是数组类型的数据
            return JSON.parse(data);
        } else return [];
    }

    // 存储到本地
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 将数据渲染到页面上
    function load() {
        // 得到本地数据
        var data = getData();
        var todoCount = 0;
        var doneCount = 0;
        // 遍历之前 清空ol
        $("ol, ul").empty();
        // 遍历数据 done为true将其放在已完成 done为false将其放在正在进行
        $.each(data, function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }
            $("#todocount").text(todoCount);
            $("#donecount").text(doneCount);

        })
    }
})