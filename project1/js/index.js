// 查：查询出来
function getData() {
    //  return 查询到的数据
    var data = localStorage.getItem('todolist'); // 得到字符串
    data = JSON.parse(data) || []; // 转成JS数组。如果没有数据，使用空数组
    return data;
}
// 增：添加
function addData(x) {
    // 1. 先取出原来的数据
    var data = getData();
    // 2. 加一条新数据
    data.push(x);
    // 3. 保存回去
    saveData(data);
}
// 删：删除
function deleteData(i) {
    // 形参i就是索引值
    // 1. 把所有数据取出来
    var data = getData();
    // 2. 删除一条数据
    data.splice(i, 1);
    // 3. 存回去
    saveData(data);
}
// 改：修改

// 存：保存
function saveData(data) {
    // 向本地存储中存储数组的话，需要将数组转成字符串
    localStorage.setItem('todolist', JSON.stringify(data));
}
// 数据结构
// [
//    { name: '张三', score: 85, money: 1.6, state: 1 }
// ]
var obj = { name: '张三', score: 85, money: 1.6, state: 1 }
// addData(obj)
// deleteData(0)

//渲染
function renderHtml() {
    // 取出数据
    var data = getData();
    var todoArr = []; // 准备存放未完成的数据   
    // 遍历数据，拼接 li 标签
    data.forEach((item, index) => {
        var li = `<li>
            <div class="t1">
            ${item.name}
            <input type="text" class="text1" style="display: none;">
            </div>
            <div class="t2">
            ${item.score}
            <input type="text" class="text2" style="display: none;">
            </div>
            <div class="t3">
            ${item.money}
            <input type="text" class="text3" style="display: none;">
            </div>
            <div>
                <span class="yes" style="display: none;"><img src="./image/yes.png" alt=""></span>
                <span class="upd" style="display: block;"><img src="./image/upd.png" alt="" ></span>
                <span class="del" style="display: block;"><img src="./image/del.png" alt="" ></span>
                <span class="no" style="display: none;"><img src="./image/no.png" alt=""></span>
            </div>
        </li>`;

        todoArr.unshift(li);

    });
    // 把li标签放到对应的ul里面
    $('ul').html(todoArr.join(''));

}
renderHtml();

zhu();
zhe();


var flag = false

//添加
$('.header').on('click', 'button', function () {
    if (flag) {
        return alert('请完成编辑')
    }
    var t1 = $('.txt1').val()
    var t2 = $('.txt2').val()
    var t3 = $('.txt3').val()
    var reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
    // console.log(reg.test(t1))
    // console.log(reg.test(t2))
    // console.log(reg.test(t3))
    if (reg.test(t1) == false && reg.test(t2) == false && reg.test(t3) == false) {
        alert('请输入内容')
    } else {
        var obj = {
            name: t1,
            score: t2,
            money: t3
        }
        $('.header input').val('')
        addData(obj)
        renderHtml()
        zhe()
        zhu()
    }
})
//删除
$('ul').on('click', '.del', function () {
    var i = $(this).parent().parent().index()
    var s = -i + $('li').length - 1
    console.log(i)
    console.log(s)
    if (flag) {
        return alert('请完成编辑')
    }
    // console.log($(this).parent().parent().index())

    if (confirm('确定?')) {
        // var i = $(this).parent().parent().index()
        // var s = -i + $('li').length - 1
        // console.log(i)
        // console.log(s)
        deleteData(s)
        renderHtml()
        zhe()
        zhu()
    }
})
//修改
var t1
var t2
var t3
$('ul').on('click', '.upd', function () {
    // alert(1)
    if (flag) {
        return alert('请完成编辑')
    }
    t1 = $(this).parent().siblings('.t1').text()
    t2 = $(this).parent().siblings('.t2').text()
    t3 = $(this).parent().siblings('.t3').text()
    $(this).parent().siblings().find('input').show()
    $(this).siblings('.yes,.no').show()
    $(this).siblings('.del').hide()
    $(this).hide()
    $(this).parents('li').addClass('active')
    $(this).parent().siblings('.t1').html(`<input type="text" class="text1">
     `)
    $(this).parent().siblings('.t2').html(`<input type="text" class="text2">
     `)
    $(this).parent().siblings('.t3').html(`<input type="text" class="text3">
     `)
    return t1, t2, t3
    zhe()
    zhu()
})

//点击 no
$('ul').on('click', '.no', function () {
    renderHtml()
    flag = false
    zhe()
    zhu()
})
//点击yes
$('ul').on('click', '.yes', function () {

    var tx1 = $(this).parent().siblings('.t1').find('input').val()
    var tx2 = $(this).parent().siblings('.t2').find('input').val()
    var tx3 = $(this).parent().siblings('.t3').find('input').val()

    var reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/

    if (reg.test(tx1) == false && reg.test(tx2) == false && reg.test(tx3) == false) {
        alert('请输入信息')
    } else {
        var obj = {
            name: tx1,
            score: tx2,
            money: tx3
        }
        var i = $(this).parent().parent().index()
        var s = -i + $('li').length - 1
        var data = localStorage.getItem('todolist');
        data = JSON.parse(data)
        console.log(data)
        data.splice(2, 1, obj)
        saveData(data)
        renderHtml()
    }
    zhe()
    zhu()
    flag = false


})
function zhu() {
    var data = getData()
    var xData = [];
    var barData = [];
    data.forEach(item => {
        xData.push(item.name);
        barData.push(item.score);
    });
    var option = {
        xAxis: {
            type: 'category',
            data: xData,
            axisLabel: {
                color: '#fff'
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff'
            },
        },
        series: [{
            data: barData,
            type: 'bar',
            itemStyle: {
                color: '#1e90ff'
            }

        }],

    };
    var myChart = echarts.init($('.zhu')[0]);
    myChart.setOption(option);
}
function zhe() {
    var data = getData()
    var xData = [];
    var barData = [];
    data.forEach(item => {
        xData.push(item.name);
        barData.push(item.money);
    });
    var option = {
        xAxis: {
            type: 'category',
            data: xData,
            axisLabel: {
                color: '#fff'
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff'
            },
        },
        series: [{
            data: barData,
            type: 'line',
            itemStyle: {
                color: '#1e90ff'
            }
        }],

    };
    var myChart = echarts.init($('.zhe')[0]);
    myChart.setOption(option);

}
