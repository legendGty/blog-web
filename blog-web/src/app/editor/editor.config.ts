declare var $: any;
declare var editormd: any;

export class EditorConfig {
  public width = '100%';
  // public width = '868';
  public height = '558';
  public baseUrl = '';
  public path = './assets/md_editor/lib/';
  public codeFold: true;
  public placeholder = '请输入正文内容'; // 输入提示
  public searchReplace = true;
  public toolbar = true;
  public emoji = true; // 关闭外部emoji工具
  public taskList = true;
  public tex = true; // 数学公式类默认不解析
  public readOnly = false;
  public tocm = true;
  public watch = true; // 是否右边展示实时预览
  public previewCodeHighlight = true;
  public saveHTMLToTextarea = true; // 保存HTML到Textarea中
  public markdown = '';
  public flowChart = true; // 流程图
  public syncScrolling = true;
  public sequenceDiagram = true; // UML时序图
  public imageUpload = true;
  public imageFormats = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
  public crossDomainUpload = true;
  public imageUploadURL = 'http://127.0.0.1:3000/common/upload_editor'; // 上传图片的接口
  // public htmlDecode = 'style,script,iframe';
  // public uploadCallbackURL = '';
    // 自定义工具栏按钮的事件处理
    // public toolbarHandlers = {

    //   imageUpload(cm, icon, cursor, selection) {
    //     // deal upload event
    //     $('#uploadImage').click();
    //     $('#uploadImage').unbind().bind('change', e => {
    //       const fd = new FormData();
    //       // 添加到fd对象中等待提交
    //       fd.append('files', e.target.files[0]);
    //       if (!fd) { return; }
    //       $.ajax({
    //         type: 'post',
    //         url: 'http://127.0.0.1:3000/common/upload',
    //         data: fd,
    //         cache: false,
    //         contentType: false,
    //         processData: false,
    //         success: data => {
    //           if (data && data.length > 0) {
    //             console.log(data);
    //             // cm.replaceSelection('![](http://10.0.10.7:1020' + data[0] + ')' + selection);
    //             // 生产环境使用相对路径
    //             cm.replaceSelection('![](' +  data[0] + ')' + selection);
    //           }
    //         }
    //       });
    //     });
    //     console.log('imageUpload =>', icon.html());
    //   },
    // };

    // 用于增加自定义工具栏的功能，可以直接插入HTML标签，不使用默认的元素创建图标
      public toolbarCustomIcons =  {
        file: `<input type="file" name="file" id="uploadImage"
          class="inputfile" style="position:absolute;opacity:0;"
          accept="image/png,image/jpeg, image/gif,image/jpg,image/svg,image/xbm,image/pgm,image/xpm" /> `
    };
    public lang = {
      toolbar: {
        imageUpload: '图片上传',  // 自定义按钮的提示文本，即title属性
      }
    };

    public editorFunction = ''; // 定义调用的方法
  // public htmlDecode = 'style,script,iframe,sub,sup|on*'; // 开启HTML标签解析，可以过滤html的标签解析,为了安全性，默认不开启
  public toolbarIconsClass = {
    imageUpload: 'fa-file-image-o', // 指定一个FontAwesome的图标类
  };
  public toolbarIcons() {
    // Or return editormd.toolbarModes[name]; // full, simple, mini
    // Using "||" set icons align right.
    return [ 'bold', 'italic', 'h1', 'h2', 'del', '|', 'list-ul', 'list-ol', 'hr',
    'quote', 'code-block', 'table', 'link', 'watch', '|', 'fullscreen', 'file', 'imageUpload', '|',
    'undo', 'redo', ];
  }

  // public toolbarIconTexts = {
  //   // 如果没有图标，则可以这样直接插入内容，可以是字符串或HTML标签
  //   // file: `<div><input type="file" name="file" id="uploadImage"
  // class="inputfile" style="position:absolute;opacity:0;" accept="image/png,image/jpeg,image/gif,image/jpg,image/svg" />
  //   // <label for="file" style="cursor:pointer;">上传文件</label></div>`
  // };


  constructor() { }
}
