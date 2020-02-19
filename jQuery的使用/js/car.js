$(function() {
    // 点击全选勾选全部商品，并改变其背景颜色
    $(".checkall").change(function() {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 点击小复选框，改变背景颜色，当全部选上，同时选上全选
    $(".j-checkbox").change(function() {
        if($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })
    // 点击加号数量加一，同时计算小计
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        price = parseFloat(price.substr(1)) * n;
        price = price.toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
        getSum();
    })
    // 点击减号数量减一（最小为1），同时计算小计
    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val();
        if(n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        price = parseFloat(price.substr(1)) * n;
        price = price.toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
        getSum();
    })
    // 直接修改文本框的值，修改小计
    $(".itxt").change(function() {
        var n = $(this).val();
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        price = parseFloat(price.substr(1)) * n;
        price = price.toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
        getSum();
    })
    // 计算总计数量和总额
    getSum();
    function getSum() {
        var count = 0;
        var money = 0;
        $(".itxt").each(function (index, element) {
            // element == this
            count += parseInt($(element).val());
        });
        $(".p-sum").each(function (index, element) {
            // element == this
            money += parseFloat($(element).text().substr(1))
        });
        money = money.toFixed(2);
        $(".amount-sum em").text(count);
        $(".price-sum em").text("￥" + money);
    }
    // 删除购物车中的商品
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    })
})