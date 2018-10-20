# css

## css让一个盒子居中的方法垂直居中

1. margin：auto

```css
给   要居中的元素   设置 margin ：auto
绝对定位  position :absolute;
top:0;bottom:0;left: 0px;right: 0px;

 ****父元素要设置相对定位****
```

2.-margin

```css
绝对定位 position :absolute
top:50%； left: 50%px
margin-top:-高度的一般
margin-left:负宽度的一半
```

3.弹性 displat: flex

```css
// 1.对父元素设置
display: flex
align-items: center
justify-content: center

// 2.父元素设置 子元素设置margin:auto
// 父元素
display: flex
// 子元素
{
  width: 75px;
  height: 75px;
  margin: auto
}
```

## 清除浮动

## c3 新增伪类

`nth-child`

`last-child-of`

## sass $ less @ stylus !@

## flex

指定一个盒子为伸缩盒子 `display: flex`

`flex-direction` 调整主轴方向 默认水平方向

`justify-content` 主轴对其

`align-items` 侧轴对齐

## 栅格布局

分12块