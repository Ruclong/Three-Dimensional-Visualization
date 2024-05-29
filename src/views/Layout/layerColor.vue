<template>
        <svg id="svg" ref="svg" width="100" height="650" top="10">
            <g ref="legend" class="legend" transform="translate(0,0)"></g>
        </svg>
</template>

<script>
import * as d3 from 'd3';
export default {
    mounted() {
        const layerColors = {
            "11煤": 0x1C1C1C, // 11煤：深灰色
            "13下煤": 0x2E2E2E, // 13下煤：稍浅的深灰色
            "13煤": 0x3F3F3F, // 13煤：更浅的深灰色
            "14煤": 0x505050, // 14煤：中灰色
            "15煤": 0x616161, // 15煤：略浅的中灰色
            "17煤": 0x727272, // 17煤：更浅的中灰色
            "18煤": 0x838383, // 18煤：浅灰色
            "21煤": 0x949494, // 21煤：更浅的浅灰色
            "22煤": 0xA5A5A5, // 22煤：非常浅的灰色
            "6煤": 0xB6B6B6, // 6煤：非常非常浅的灰色
            "7煤": 0xC7C7C7, // 7煤：极浅的灰色
            "8煤": 0xD8D8D8, // 8煤：极极浅的灰色
            "9煤": 0xE9E9E9, // 9煤：几乎白色的灰色
            "中砂岩": 0xD2B48C, // 中砂岩：黄褐色
            "中砾岩": 0x8B4513, // 中砾岩：马鞍棕色
            "中粒砂岩": 0xF4A460, // 中粒砂岩：沙棕色
            "中细砂岩": 0xCD853F, // 中细砂岩：秘鲁色
            "中角砾岩": 0xA0522D, // 中角砾岩：赭色
            "含砾中粒砂岩": 0xDAA520, // 含砾中粒砂岩：金色
            "天然焦": 0x8B0000, // 天然焦：深红色
            "断层破碎带": 0x696969, // 断层破碎带：暗灰色
            "无芯": 0xA9A9A9, // 无芯：暗灰色
            "泥岩": 0x8B4513, // 泥岩：马鞍棕色
            "泥质灰岩": 0xC0C0C0, // 泥质灰岩：银色
            "泥质石灰岩": 0x778899, // 泥质石灰岩：浅钢蓝色
            "泥质角砾岩": 0x708090, // 泥质角砾岩：板岩蓝色
            "火山角砾岩": 0x556B2F, // 火山角砾岩：暗橄榄绿色
            "火成岩": 0x8B0000, // 火成岩：深红色
            "炭质泥岩": 0x2F4F4F, // 炭质泥岩：暗灰蓝色
            "煌斑岩": 0xB22222, // 煌斑岩：火砖色
            "煤": 0x000000, // 煤：黑色
            "石灰岩": 0x808080, // 石灰岩：灰色
            "砂岩": 0xD2B48C, // 砂岩：黄褐色
            "砂泥岩": 0xCD853F, // 砂泥岩：秘鲁色
            "砂泥岩互层": 0xD2691E, // 砂泥岩互层：巧克力色
            "砂砾": 0xF4A460, // 砂砾：沙棕色
            "砂质泥岩": 0x8B4513, // 砂质泥岩：马鞍棕色
            "砂质粘土": 0xA0522D, // 砂质粘土：赭色
            "破碎带": 0xA9A9A9, // 破碎带：暗灰色
            "砾石": 0xD2B48C, // 砾石：黄褐色
            "粉砂岩": 0xBC8F8F, // 粉砂岩：玫瑰棕色
            "粗砂岩": 0xF4A460, // 粗砂岩：沙棕色
            "粗粒砂岩": 0xDEB887, // 粗粒砂岩：浅褐色
            "粘土": 0xD2691E, // 粘土：巧克力色
            "粘土岩": 0x8B4513, // 粘土岩：马鞍棕色
            "粘土页岩": 0xA0522D, // 粘土页岩：赭色
            "细砂岩": 0xF5DEB3, // 细砂岩：小麦色
            "细粒砂岩": 0xCD853F, // 细粒砂岩：秘鲁色
            "铁质泥岩": 0x8B0000, // 铁质泥岩：深红色
            "铝土岩": 0xDAA520, // 铝土岩：金色
            "铝质页岩": 0xB22222, // 铝质页岩：火砖色
        };

        const svg = d3.select("svg"); // 选择SVG元素
        const margin = { top: 2, right: 0, bottom: 0, left: 0 };
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`); // 创建一个组元素，并根据边距进行平移
        const legend = g.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(0,0)"); // 创建图例的组元素，放置在左上角

        const layers = Object.keys(layerColors);
        const legendHeight = 7.4;
        const legendWidth = 10;

       layers.forEach((layer, i) => {
            legend.append("rect")
                .attr("x", 0) // 矩形的x坐标
                .attr("y", i * (legendHeight + 5))  // 根据索引值调整y坐标，使其垂直排列
                .attr("width", legendWidth) // 矩形的宽度
                .attr("height", legendHeight) // 矩形的高度
                .attr("fill", `#${layerColors[layer].toString(16).padStart(6, '0')}`); // 矩形的填充颜色

            legend.append("text")
                .attr("x", legendWidth + 5)  // 文本的x坐标，位于矩形右侧
                .attr("y", i * (legendHeight + 5) + legendHeight / 2) // 文本的y坐标，垂直居中
                .attr("dy", "0.35em") // 文本的垂直偏移量
                .attr("text-anchor", "start") // 文本的对齐方式
                .style("font-size", "10px") // 设置字体大小
                .text(layer); // 设置文本内容为岩层名称
        });
    }
}
</script>


<style >

#svg {
  position: absolute;
  top: 10px;
  right: 0px;
  padding: 10px;
  border-radius: 5px;
}
.legend {
    top: 10px;
  
  font-size: 12px;
}
</style>