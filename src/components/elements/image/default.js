export default {
  id: 1,
  title: '图片',
  name: 'gaImage',
  type: 1,
  src: 'https://n1image.hjfile.cn/res7/2018/12/27/c87aad35f648cd2376641e3e7245498a.png',
  style: {
    left: 10,
    top: 10,
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'dotted',
    borderColor: '#959595',
    zIndex: 10,
    Image: {
      // contain 被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。
      // cover 被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。
      // fill 被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。
      // none 被替换的内容将保持其原有的尺寸。
      // scale-down 内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。
      objectFit: 'none'
    }
  }
};