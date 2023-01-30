<template>
  <div class="theme-view-container">
    <div class="contents-detail-view">
      <div class="contents-section">
        <div class="title h2">Style Guide </div>
        <div class="type-wrapper">
          <div class="type-title">Typeface</div>
          <div class="type-desc">기본 글꼴 - {{fontInfo.name}} {{fontType}} </div>
          <div class="type-contents panel">
            <div class="panel-menu">
              <div class="panel-item" :class="{active: fontType === 'Bold'}" @mouseenter="setFont">Bold</div>
              <div class="panel-item" :class="{active: fontType === ''}" @mouseenter="setFont">Regular</div>
              <div class="panel-item" :class="{active: fontType === 'Light'}" @mouseenter="setFont">Light</div>
              <div class="panel-item" :class="{active: fontType === 'Thin'}" @mouseenter="setFont">Thin</div>
            </div>
            <div class="hw-grid" :style="{fontFamily: `${fontInfo.name} ${fontType}`}">
              <div class="column bold span-4" :style="{fontSize: '10em'}">Aa</div>
              <div class="column bold span-5" :style="{fontSize: '10em'}">ㄱㄴ</div>
              <div class="column h3 span-10" :style="{letterSpacing: '5px'}">
                <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p>abcdefghijklmnopqrstuvwxyz</p>
                <p>1234567890 ,./(){}[]\|:;"'?</p>
                <p>가나다라마바사 스포크 한 산스</p>
              </div>
            </div>
          </div>
          <div class="type-desc">기본 글꼴 - {{fontInfo1.name}} ${fontType1}</div>
          <div class="type-contents panel">
            <div class="panel-menu">
              <div class="panel-item" :class="{active: fontType === 'Black'}" @mouseenter="setFont1">Black</div>
              <div class="panel-item" :class="{active: fontType === 'Bold'}" @mouseenter="setFont1">ExtraBold</div>
              <div class="panel-item" :class="{active: fontType === 'Bold'}" @mouseenter="setFont1">Bold</div>
              <div class="panel-item" :class="{active: fontType === 'Medium'}" @mouseenter="setFont1">Medium</div>
              <div class="panel-item" :class="{active: fontType === ''}" @mouseenter="setFont1">Regular</div>
              <div class="panel-item" :class="{active: fontType === 'Light'}" @mouseenter="setFont1">Light</div>
              <div class="panel-item" :class="{active: fontType === 'Thin'}" @mouseenter="setFont1">Thin</div>
            </div>
            <div class="hw-grid" :style="{fontFamily: `${fontInfo1.name} ${fontType1}`}">
              <div class="column bold span-4" :style="{fontSize: '10em'}">Aa</div>
              <div class="column bold span-5" :style="{fontSize: '10em'}">ㄱㄴ</div>
              <div class="column h3 span-10" :style="{letterSpacing: '5px'}">
                <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p>abcdefghijklmnopqrstuvwxyz</p>
                <p>1234567890 ,./(){}[]\|:;"'?</p>
                <p>가나다라마바사 프리텐다드</p>
              </div>
            </div>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">Line Height</div>
          <div class="type-desc">글자 높이 / Line Height: 1.5</div>
          <div class="type-contents panel">
            <div class="content bold h1">
              <span class=" mark-lh">{{fontInfo.name}}</span>
            </div>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">Font-Weight</div>
          <div class="type-desc">글자 굵기 - 기본값은 [Regular]이고 기본값이 아닌 경우 [light || Bold] 표시. </div>
          <div class="type-contents panel">
            <div class="hw-grid">
              <div class="rows left-side">
                <div class="column two">Name</div>
                <div class="column">Value</div>
                <div class="column">Usage</div>
              </div>
              <div class="rows left-side">
                <div class="column two">Light</div>
                <div class="column">300</div>
                <div class="column light">가비아의 스마트 오피스</div>
              </div>
              <div class="rows left-side">
                <div class="column two">Regular</div>
                <div class="column">400</div>
                <div class="column">가비아의 스마트 오피스</div>
              </div>
              <div class="rows left-side">
                <div class="column two">Bold</div>
                <div class="column">700</div>
                <div class="column bold">가비아의 스마트 오피스</div>
              </div>
            </div>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">Letter-Spacing</div>
          <div class="type-desc">글자 간격 - 기본값은 [Normal]이고 기본값이 아닌경우 정의된 이름 표시.</div>
          <div class="type-contents panel">
            <div class="hw-grid">
              <div class="rows left-side h4">
                <div class="column span-2">Name</div>
                <div class="column">Value</div>
                <div class="column span-3">Code</div>
                <div class="column">Usage</div>
              </div>
              <div class="rows left-side">
                <div class="column span-2">Wider</div>
                <div class="column">1</div>
                <div class="column span-3" >class="spacing-wider"</div>
                <div class="column spacing-wider">가비아의 스마트 오피스</div>
              </div>
              <div class="rows left-side">
                <div class="column span-2">Wide</div>
                <div class="column">0.5</div>
                <div class="column span-3">class="spacing-wide"</div>
                <div class="column spacing-wide">가비아의 스마트 오피스</div>
              </div>
              <div class="rows left-side">
                <div class="column span-2">Normal</div>
                <div class="column">0</div>
                <div class="column span-3"></div>
                <div class="column">가비아의 스마트 오피스</div>
              </div>
              <div class="rows left-side">
                <div class="column span-2">Narrow</div>
                <div class="column">-0.5</div>
                <div class="column span-3">class="spacing-narrow"</div>
                <div class="column spacing-narrow">가비아의 스마트 오피스</div>
              </div>
              <div class="rows left-side">
                <div class="column span-2">Narrower</div>
                <div class="column">-1</div>
                <div class="column span-3">class="spacing-narrower"</div>
                <div class="column spacing-narrower">가비아의 스마트 오피스</div>
              </div>
            </div>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">Heading</div>
          <div class="type-desc">제목 스타일  </div>
          <div class="type-contents panel">
            <div class="content-item" v-for="(n, index) in [28,24,18,16,14]" :key="n" :class="`h${index+1}`">[H{{index+1}}] 가비아 UI System ({{n}}px)</div>
          </div>
        </div>
<!--        <div class="type-wrapper">-->
<!--          <div class="type-title">Usage</div>-->
<!--          <div class="type-desc">사용 예시</div>-->
<!--          <div class="type-contents panel">-->
<!--            <div class="example-list-columns">-->
<!--              <div class="header-columns">-->
<!--                <div class="column" v-for="column in usage_column" :key="column.name">{{column.name}}</div>-->
<!--              </div>-->
<!--              <div class="body-columns" v-for="(row, index) in usage_row" :key="index">-->
<!--                <div class="column" v-for="(value, key) in row" :key="key+index" :class="key">-->
<!--                  <template v-if="key === 'class'">-->
<!--                    <span class="ex_data" :class="value">{{row.category}}</span>-->
<!--                    <span class="ex_class">{{value}}</span>-->
<!--                  </template>-->
<!--                  <template v-else>{{value}}</template>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="type-wrapper">
          <div class="type-title">Size</div>
          <div class="type-desc">글자 크기 </div>
          <div class="type-contents panel">
            <div class="type-contents inline">
              <div class="content-item" v-for="size in contentsSize" :key="size" :class="`${size}`"> {{size}}</div>
            </div>
            <div class="type-contents inline">
              <div class="hw-button primary" v-for="size in contentsSize" :key="size" :class="`${size}`"><span class="label">{{size}}</span></div>
            </div>
          </div>
        </div>

        <div class="type-wrapper">
          <div class="type-title">Brand Colors</div>
          <div class="type-preview">
            <div class="contents-wrapper" v-for="content in contentList" :key="content.type">
              <div class="sub-title">{{content.type}} <span v-if="content.variant">(variant)</span>   </div>
              <div class="type-contents inline">
                <div class="content-card" v-for="item in content.list" :key="item.name">
                  <div class="color-box" :class="item.class">
                    <div class="name">{{item.name}}</div>
                    <div class="code">{{item.value}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="type-title">Site Color (only Background)</div>
          <div class="type-preview">
            <div class="contents-wrapper" v-for="content in contentBgList" :key="content.type">
              <div class="sub-title">{{content.type}} <span v-if="content.variant">(variant)</span>   </div>
              <div class="type-contents inline">
                <div class="content-card" v-for="item in content.list" :key="item.name">
                  <div class="color-box" :class="item.class">
                    <div class="name">{{item.name}}</div>
                    <div class="code">{{item.value}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="type-title">Grayscale</div>
          <div class="type-preview">
            <div class="contents-wrapper" v-for="content in contentTypoList" :key="content.type">
              <div class="sub-title">{{content.type}} <span v-if="content.variant">(variant)</span>   </div>
              <div class="type-contents inline">
                <div class="content-card" v-for="item in content.list" :key="item.name">
                  <div class="color-box" :class="item.class">
                    <div class="name">{{item.name}}</div>
                    <div class="code">{{item.value}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="type-title">Colors</div>
          <div class="type-preview">
            <div class="contents-wrapper" v-for="content in contentIssueList" :key="content.type">
              <div class="sub-title">{{content.type}} </div>
              <div class="type-contents inline">
                <div class="content-card" v-for="item in content.list" :key="item.name">
                  <div class="color-box" :class="item.class">
                    <div class="name">{{item.name}}</div>
                    <div class="code">{{item.value}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">Border</div>
          <div class="type-preview">
            <div class="type-contents inline">
              <div class="content-card" v-for="item in contentBorderList" :key="item.name">
                <div class="color-box border-color" :class="item.class"></div>
                <div class="name">{{item.name}}</div>
                <div class="code">{{item.value}}</div>
              </div>
            </div>
            <!--                        <div class="border-color">baseBorder : #D6D6D6</div>-->
            <!--                        <div class="border-color dark">darkBorder : #909090</div>-->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theme-view',
  data() {
    return {
      text: '',
      fontType : '',
      fontInfo: {
        // name: '맑은 고딕 (Malgun Gothic)',
        name: 'Spoqa Han Sans',
        fontSize: '14px',
        fontColor: '#333333'
      },
      fontType1 : '',
      fontInfo1: {
        // name: '맑은 고딕 (Malgun Gothic)',
        name: 'Pretendard',
        fontSize: '14px',
        fontColor: '#333333'
      },
      usage_column: [
        { name: "category", rowKey: "category", width:150 },
        { name: "weight", rowKey: "weight", width: 80 },
        { name: "size", rowKey: "size", width: 80 },
        { name: "spacing", rowKey: "spacing", width: 50},
        { name: "", rowKey: "example", width: 150 },
      ],
      usage_row: [
        {category: 'Title 1', weight: 'Bold', size: '22pt', spacing: '-1', example: '환경 설정 페이지 타이틀', class: 'bold h1 spacing-narrower'},
        {category: 'Title 2', weight: 'Bold', size: '20px', spacing: '-0.5', example: '메일 타이틀', class: 'bold h2 spacing-narrow'},
        {category: 'SubTitle 1', weight: 'Bold', size: '16px', spacing: '-0.5', example: '레이어 타이틀', class: 'bold h4 spacing-narrow'},
        {category: 'SubTitle 2', weight: 'Regular/Bold', size: '15px', spacing: '-0.5', example: 'LNB 메뉴 타이틀', class: 'regular h5 spacing-narrow'},
        {category: 'body 1', weight: 'Regular', size: '14px', spacing: '0', example: '본문', class: ''},
        {category: 'body 2', weight: 'Light', size: '13px', spacing: '-0.5', example: '태그(주소록)', class: 'light small spacing-narrow'},
        {category: 'Tag/Label', weight: 'Regular', size: '12px', spacing: '-0.5', example: '라벨 또는 태그(공용 메일)', class: 'tiny spacing-narrow'},
        {category: 'Button 1', weight: 'Regular', size: '18px', spacing: '-1', example: 'LNB 기능 버튼', class: 'large spacing-narrower'},
        {category: 'Button 2', weight: 'Regular', size: '14px', spacing: '-0.5', example: 'Medium 버튼, 텍스트 버튼', class: 'spacing-narrow'},
        {category: 'Button 3', weight: 'Regular', size: '13px', spacing: '-0.5', example: 'small 버튼, 텍스트 버튼', class: 'small spacing-narrow'},
        {category: 'Caption', weight: 'Light', size: '13px', spacing: '-0.5', example: '경고, 도움 문구', class: 'small spacing-narrow'},
        {category: 'GNB 서비스명', weight: 'Regular', size: '20px', spacing: '-1', example: '', class: 'huge spacing-narrower'},

      ],
      contentList: [
        {
          type: 'Primary',
          variant: true,
          list: [
            {name: 'Primary', class:'primary', value: '#3c79b8'},
            {name: 'Primary Dark', class:'primary dark', value: 'darken '},
            {name: 'Primary Darker', class:'primary darker', value: '#004F9A'},
          ]
        },
        {
          type: 'Primary1',
          variant: true,
          list: [
            {name: 'Primary1', class:'primary1', value: '#2985DB'},
            {name: 'Primary1 Dark', class:'primary1 dark', value: '#056AC9'},
            {name: 'Primary1 Darker', class:'primary1 darker', value: '#004F9A'},
          ]
        },
        {
          type: 'Secondary',
          variant: true,
          list: [
            {name: 'Secondary', class:'secondary', value: '#EBEBEB'},
            {name: 'Secondary Dark', class:'secondary dark', value: '#909090'},
            {name: 'Secondary Darker', class:'secondary darker', value: '#575757'},
          ]
        }
      ],
      contentBgList: [
        {
          type: 'Surface',
          variant: false,
          list: [
            {name: 'Surface 1', class:'surface1', value: '#F8F8F8'},
            {name: 'Surface 2', class:'surface2', value: '#EFF4FC'},
            {name: 'Surface 3', class:'surface3', value: '#DAE8F8'},
          ]
        },
        {
          type: 'Background',
          variant: false,
          list:[ {name: 'Background1', class:'background1', value: '#FFFFFF'},]
        }
      ],
      contentTypoList: [
        {
          type: 'Black and White',
          list: [
            {name: 'Black(default)', class:'black', value: '#333333'},
            {name: 'White', class:'white', value: '#FFFFFF'},
            {name: 'Transparent', class:'transparent', value: 'transparent'}

          ]
        },
        {
          type: 'Grayscale',
          list: [
            {name: 'Gray Light', class:'gray light', value: '#676767'},
            {name: 'Gray', class:'gray', value: '#909090'},
            {name: 'Gray Dark', class:'gray dark', value: '#C4C4C4'},

          ]
        }
      ],
      contentIssueList: [
        {
          type: 'Issue Colors',
          list: [
            {name: 'Red', class:'red', value: '#D75757'},
            {name: 'Orange', class:'orange', value: '#EE9033'},
            {name: 'Yellow', class:'yellow', value: '#F8B825'},
            {name: 'Lightgreen', class:'lightgreen', value: '#B3BC40'},
            {name: 'Green', class:'green', value: '#61A475'},
            {name: 'Lightblue', class:'lightblue', value: '#8CC5CE'},
            {name: 'Blue', class:'blue', value: '#70A3CA'},
            {name: 'DeepBlue', class:'deep_blue', value: '#5178AF'},
            {name: 'DeepPurple', class:'deep_purple', value: '#9180B4'},
            {name: 'Purple', class:'purple', value: '#AF77C0'},
            {name: 'Brown', class:'brown', value: '#A86A82'},
            {name: 'Gray', class:'gray', value: '#8B8B8B'},
          ]
        },
        {
          type: 'State Colors',
          list: [
            //{name: 'Success', class:'success', value: '#61A475'},
            {name: 'Danger', class:'danger', value: '#BE5858'},
            {name: 'Error', class:'error', value: '#D50000'},
            {name: 'Attention', class:'attention', value: '#EC6E00'},
            {name: 'Importance', class:'importance', value: '#FDC036'},
            {name: 'Info', class:'info', value: '#EBEBEB'}
          ]
        }
      ],
      contentsSize: ['tiny', 'small', 'medium', 'large', 'huge', 'massive'],
      contentBorderList: [
        {name: 'Border', class:'', value: '#D6D6D6'},
        {name: 'Dark Border', class:'dark-border', value: '#909090'},
      ],
      progressData: [
        {
          text: 'Primary',
          textAlign: 'center',
          ratio: 20,
          progress: 100,
          backgroundClass: 'primary'
        },
        {
          text: 'Primary Dark',
          textAlign: 'center',
          ratio: 20,
          progress: 100,
          backgroundClass: 'primary dark'
        },
        {
          text: 'Primary Darker',
          textAlign: 'center',
          ratio: 20,
          progress: 100,
          backgroundClass: 'primary darker'
        },
      ]
    }},
  methods: {
    setFont(e) {
      this.fontType = e.target.textContent != '' ? e.target.textContent : ''
    },
    setFont1(e) {
      this.fontType1 = e.target.textContent != '' ? e.target.textContent : ''
    }
  }
}
</script>

<style lang="scss" scoped>
@function relativePx($number) {
  @return ($number/14)+em
}
@function absolutePx($number) {
  @return ($number/14)+rem
}


//font family
$fontName: 'Spoqa Han Sans';
$fontSmoothing: antialiased;
//font weight
$thin: 100;
$extra-light: 200;
$light: 300;
$regular: 400;
$medium: 500;
$semi-bold: 600;
$bold: 700;
$extra-bold: 800;
$black-bold: 900;

$lineHeight: 1.5;

//letter spacing
$widerSpacing: 1px;
$wideSpacing: 0.5px;
$baseSpacing: 0;
$narrowSpacing: -0.5px;
$narrowerSpacing: -1px;

$borderColor: #D6D6D6;
$borderDarkColor: darken($borderColor, 27.4);
$background: #F4F4F4;

//#definitions
$white: #ffffff;
$primary: #3c79b8;
//$primary1: #f7741e;
$secondary: #35363a;

$surface: #EFF4FC;

$black: #333333;
$gray: #909090;

$lightGray: lighten($gray, 16.1); //#C4C4C4
$darkGray: lighten($black, 20.4); //#676767

$darkPrimary: darken(saturate($primary, 23.9), 10.6); //#056AC9
$darkSecondary: darken($secondary, 35.7); //#909090
$darkerPrimary: darken(saturate($primary, 28.8), 20.8); //#004F9A
$darkerSecondary: darken($secondary, 58.1); //#575757

//$darkPrimary1: darken(saturate($primary1, 23.9), 10.6); //#056AC9
//$darkerPrimary1: darken(saturate($primary1, 28.8), 20.8); //#004F9A

$surface1: #F8F8F8;
$surface2: #EFF4FC;
$surface3: #DAE8F8;

$background1: $white;



$issue_red: #D75757;
$issue_orange: #EE9033;
$issue_yellow: #F8B825;
$issue_lightgreen: #B3BC40;
$issue_green: #61A475;
$issue_lightblue: #8CC5CE;
$issue_blue: #70A3CA;
$issue_deep_blue: #5178AF;
$issue_deep_purple: #9180B4;
$issue_purple: #AF77C0;
$issue_brown: #A86A82;
$issue_gray: #8B8B8B;

$danger: #BE5858;
$dangerDark: #A73030;
$error: #D50000;
$attention: #EC6E00;
$importance: #FDC036;


$headerFontWeight: $bold;
$h1: absolutePx(28);
$h2: absolutePx(24);
$h3: absolutePx(18);
$h4: absolutePx(16);
$h5: absolutePx(14);

//Size
$tinySize: (10 / 14);
$smallSize: (13 / 14);
$normalSize: (14 / 14);
$mediumSize: (16 / 14);
$largeSize: (18 / 14);
$hugeSize: (20 / 14);
$massiveSize: (24 / 14);

//$tiny-size: 0.5em;
//$small-size: 0.75em;
//$normal-size: 1em;
//$large-size: 1.25em;
//$huge-size: 1.5em;

//Definitions
.h1 {font-size: $h1; font-weight: $headerFontWeight;}
.h2 {font-size: $h2;  font-weight: $headerFontWeight;}
.h3 {font-size: $h3;  font-weight: $headerFontWeight;}
.h4 {font-size: $h4;  font-weight: $headerFontWeight;}
.h5 {font-size: $h5;  font-weight: $headerFontWeight;}

.tiny {font-size: $tinySize+em};
.small {font-size: $smallSize+em};
.normal {font-size: $smallSize+em};
.medium {font-size: $mediumSize+em};
.large {font-size: $largeSize+em};
.huge {font-size: $hugeSize+em};
.massive {font-size: $massiveSize+em};


// Scroll Bars

$useCustomScrollbars: true;

$customScrollbarWidth: 8px;
$customScrollbarHeight: 8px;

$trackBackground: rgba(0, 0, 0, 0);
$trackBorderRadius: 0px;

$thumbBorderRadius: 4px;
$thumbBackground: rgba(0, 0, 0, 0.25);
$thumbTransition: color 0.2s ease;
$thumbBorderWidth: 0px;
$thumbBorderColor: $background;

$thumbInactiveBackground: rgba(0, 0, 0, 0.15);
$thumbHoverBackground: rgba(128, 135, 139, 0.8);

/* Inverted */
$trackInvertedBackground: rgba(255, 255, 255, 0.1);
$thumbInvertedBackground: rgba(255, 255, 255, 0.25);
$thumbInvertedInactiveBackground: rgba(255, 255, 255, 0.15);
$thumbInvertedHoverBackground: rgba(255, 255, 255, 0.35);



.thin {font-weight: $thin;}
//.extra-light {font-weight: $extra-light;}
.light {font-weight: $light;}
.regular {font-weight: $regular;}
//.medium {font-weight: $medium;}
//.semi-bold {font-weight: $semi-bold;}
.bold {font-weight: $bold;}
//.extra-bold {font-weight: $extra-bold;}
.black {font-weight: $black-bold;}

.spacing-wider {letter-spacing:$widerSpacing}
.spacing-wide {letter-spacing:$wideSpacing}
.spacing-normal {letter-spacing:normal}
.spacing-narrow {letter-spacing:$narrowSpacing}
.spacing-narrower {letter-spacing:$narrowerSpacing}

.primary {
  color: #fff;
  background-color: $primary;
  &.dark {
    background-color:$darkPrimary;
  }
  &.darker {
    background-color:$darkerPrimary;
  }
}
//.primary1 {
//  color: #fff;
//  background-color: $primary1;
//  &.dark {
//    background-color:$darkPrimary1;
//  }
//  &.darker {
//    background-color:$darkerPrimary1;
//  }
//}
.secondary {
  color: #fff;
  background-color: $secondary;
  &.dark {
    background-color: $darkSecondary;
  }
  &.darker {
    background-color: $darkerSecondary;
  }
}

.surface {
  &1 {background-color: $surface1; color: $black}
  &2 {background-color: $surface2;}
  &3 {background-color: $surface3;}
}
.background1 {
  background-color: $background1;
  border: 1px solid $gray;
}
.white {
  background-color: $white;
  border: 1px solid $gray;
  .name, .code {
    color: $black !important;
  }

}
.black {
  background-color: $black;
}
.transparent {
  background-color: transparent;
}
.gray {
  background-color: $gray;
  &.light {
    background-color: $lightGray;
  }
  &.dark {
    background-color: $darkGray;
  }
}
.grayscale {
  //background-color: $black;
  &.gray1 {background-color: $darkGray;}
  &.gray2 {background-color: $gray;}
  &.gray3 {background-color: $lightGray;}
}

.red {background-color: $issue_red;}
.orange {background-color: $issue_orange;}
.yellow {background-color: $issue_yellow;}
.lightgreen {background-color: $issue_lightgreen;}
.green {background-color: $issue_green;}
.lightblue {background-color: $issue_lightblue;}
.blue {background-color: $issue_blue}
.deep_blue {background-color: $issue_deep_blue;}
.deep_purple {background-color: $issue_deep_purple;}
.purple {background-color: $issue_purple;}
.brown {background-color: $issue_brown;}
.gray11 {background-color: $issue_red;}

//.success{background-color:$issue_green;}
.error{background-color: $error;}
.danger{background-color: $danger;}
.danger:hover{background-color: $dangerDark;}
.attention{background-color:$attention;}
.importance{background-color:$importance;}
.info{background-color:$secondary;}

.palette-wrap {
  display: flex;
  flex-wrap: wrap;
  .color-palette {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: .8em 1.2em;
    min-width: 110px;
    min-height: 110px;
    /*margin: 10px;*/
    color: #ffffff;
    font-weight: 600;
    &.light {
      color: #909090;
    }
  }
}
.sub-title {
  font-weight: 600;
  font-size: 1.1em;
}
.type-wrapper {
  padding : 20px;
}
.sub-title {
  color: #909090;
  padding: 20px 0 10px;

}
.type-contents {
  width: 100%;
  padding: 20px;
  margin-top:30px;
  &.inline {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .content-card {
    //border:1px solid #EBEBEB;
    position: relative;
    width: 150px;
    height: 150px;
    /*max-width: 30%;*/
    /*padding: 10px;*/
    /*margin: 5px;*/
    /*transition: border-width 250ms ease;*/
    .name {
      position: absolute;
      top:0;
      left: 0;
      padding: 10px;
    }
    .code {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    }
    /*&:hover {*/
    /*    border-left: 10px solid #EBEBEB;*/
    /*}*/
  }
  &-list {
    .content-item {
      padding: 10px;
    }
  }
  .content-item {
    padding: 10px;
  }

}
.color-box {
  width: 100%;
  height: 100%;
  /*padding: 20px;*/
  /*margin: 20px 0;*/

}
.border-color {
  padding: 10px;

  border-top:1px solid $borderColor;
  border-bottom:2px solid $borderColor;
  &.dark-border {
    border-color: $borderDarkColor;
  }
}
.mark-lh {
  display: inline-block;
  line-height: 1.5;
  border-top: 1px solid #909090;
  border-bottom: 1px solid #909090;
}

* {
  // ----- FireFox -----
  // scrollbar-color: <막대 색상> <트랙 색상>
  // scrollbar-width: thin | none | auto
  scrollbar-color: $thumbBackground $trackBackground;
  scrollbar-width: thin;

  // ----- Internet Explorer -----
  // scrollbar-face-color: <막대 색상>
  // scrollbar-track-color: <트랙 색상>
  // scrollbar-arrow-color: <양 끝 화살표 색상>
  scrollbar-face-color: $thumbBackground;
  scrollbar-track-color: $trackBackground;
  scrollbar-arrow-color: #f1f1f1;
  // ----- Webkit(Chrome, Edge, Safari) -----
  &::-webkit-scrollbar{
    // 스크롤바의 크기를 정의합니다.
    // (width - 세로 스크롤 두께) (height - 가로 스크롤 두께)
    width: $customScrollbarWidth;
    height: $customScrollbarHeight;
  }
  &::-webkit-scrollbar-thumb{
    // 스크롤바의 막대 색상을 정의합니다.
    background-color: $trackBackground;
    border-radius: $thumbBorderRadius;
    border:$thumbBorderWidth solid $thumbBorderColor;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: $thumbBackground;
  }
  &::-webkit-scrollbar-track{
    // 스크롤바의 트랙 색상을 정의합니다.
    background-color: $trackBackground;
  }
  &::-webkit-scrollbar-button{
    // 스크롤바의 버튼 색상을 정의합니다.
  }
}

.example-list-columns {
  background-color: #f8f8f8;
  .header-columns, .body-columns {
    width: 100%;
    display: flex;
    padding: 2px;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #ebebeb;
    .column{
      width: 15%;
      height: auto;
      text-align: center;
      margin: 3px;
      padding: 10px;

      &.class {
        position: absolute;
        width: 100%;
        height: 50px;
        background-color: #fff;
        padding: 10px 20px;
        top: 100%;
        left: 0;
        z-index: -1;
        /*text-align: left;*/
        display: flex;
        justify-content: space-between;
        .ex_class {
          font-weight: 600;
        }
      }
      &.example {
        width: 25%;
        flex-grow: 1;
      }

    }
    &:hover .class {
      top:0;
      z-index: 100;
    }
  }
  .header-columns {
    border-bottom: 2px solid #ebebeb;
    .column {
      font-weight: 600;
    }

  }
}

.theme-view-container {
  font-family: $fontName;
}
.type-contents {
  position: relative;
  .panel-menu {
    position: absolute;
    top:0;
    right: 0;
    text-align: right;
    .panel-item {
      display: inline-block;
      padding: 4px 8px;
      &:hover {
        font-weight: 700;
      }
      &.active {
        font-weight: bold;
      }
    }
  }
  .rows {
    border-bottom: 1px solid #909090;
    padding-top: 10px;
    padding-bottom: 10px;
    &:first-child {
      font-weight: bold;
    }
  }
}

</style>
