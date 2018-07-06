<template>
    <el-container class="applicableModels">
        <el-header class="bgFFF">
            <el-breadcrumb>
                <el-breadcrumb-item>
                   <router-link to="/goods/publishProduct">新增商品</router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    适用车型
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <el-main class="bgFFF">
            <div class="top-header">
                <ul id="abcBox">
                    <li :class="{changeabc:changeabc==index}" @click="changeABC(index,value)" v-for="(value,index) in ABC" >{{value}}</li>
                </ul>
            </div>

            <div class="main">
                <div class="main-one" id="box">
                    <ul>
                        <li class="mainBrand">主营品牌
                            <ul class="model">
                                <li class="pointer" v-for="(value,index) in mainbrandlist" @click="Modellist(value.id,index)">{{value.name}}
                                    <ul v-if="index==indexx">
                                        <li v-for="(item,index) in modellists"@click.stop="getYourMoney(item.id,item.name)">{{item.name}}</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="ABCBrand" v-for="(value) in ABC" :id="value" :name='value'>{{value}}
                            <ul class="ABCBrand-model">
                                <li class="pointer"  v-for="(item,index) in Brands" @click="Modellist(item.id,index+3)">{{item | myCurrency(value)}}
                                    <ul v-if="index+3==indexx && value==item.pinyin_initial">
                                        <li v-for="(list,index) in modellists" @click.stop="getYourMoney(list.id,list.name)">{{list.name}}</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div class="main-two">
                    <input class="input fl" type="text" v-model="addCar" placeholder="未查到的数据，在这添加" :disabled='!CarmodelsName'>
                    <button class="btn fl" @click="AddCar">添加</button>
                    <div class="main">
                        <span class="Nodata" v-if="getYearList.length==0">暂无数据</span>
                        <div class="left">
                            <ul>
                                <li :class="{yearLi:yearIndex==index}" v-for="(value,index) in getYearList" @click="caryearlist(value.year,index)">{{value.year}}</li>
                            </ul>
                        </div>
                        <div class="right">
                            <ul>
                                <li v-for="(value,index) in YearParameterList" @click.stop="selectModel(index,value.id,value.name)">{{value.name}}
                                    <i v-if="value.select" class="fr"><img src="@/assets/goods/yes.png" alt=""></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="main-three">
                    <div class="top">
                        已选{{carNum}}款
                    </div>
                    <div class="carList">
                        <el-tree v-if="data5"
                        :data="data5"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="true">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>
                            <el-button
                                type="text"
                                size="mini"
                                @click="() => remove(node, data)">
                                <span class="cha">×</span>
                            </el-button>
                            </span>
                        </span>
                        </el-tree>
                    </div>
                    <button class="btn" @click="save">保存</button>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import {mainbrandlist,modellist,getbrand,getalistofyears,getYearParameterList} from '@/api/goods/goods'
    var params = []
export default {
    data () {
        return {
            data5: '',
            ABC:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            changeabc:0,
            mainbrandlist:[],   //主营品牌
            modellists:[],   //车型列表
            indexx:0,
            addCar:'',  //手动添加的车型
            Brands:[],//品牌,
            getYearList:[],//年款列表
            YearParameterList:[],//年款对象列表
            carID:'',//车型id
            yearIndex:-1,//年索引
            BrandsID:'',
            BrandsName:'',
            CarmodelsID:'',
            CarmodelsName:'',
            CarseriesID:'',
            CarseriesName:'',
            yearStyle:'',
            carNum:0,
            carList:[],
        };
    },

    components: {},

    created(){
        params = []
        this.getData()
        this.getSelected()
    },
    filters:{
        myCurrency:function(myInput,arg1){
           if(myInput.pinyin_initial == arg1){
               return myInput.name
           }
        }
    },
    methods:{
        getData(){
            mainbrandlist().then(res=>{
                this.mainbrandlist = res.data.data
            })

            let data = {
                type:'brand'
            }

            getbrand(data).then(res=>{
                this.Brands = res.data.data
            })
        },
        getSelected(){  //初始化已选
            let trialModelsModal = JSON.parse(localStorage.trialModelsModal)
            let brand_id = 0
            let model_id = 0
            trialModelsModal.filter(res=>{
                if(res.brand_id!=brand_id){
                    params.push({
                        id: res.brand_id,
                        label:res.brand_name,
                        children: [{
                            id: res.model_id,
                            label: res.model_name,
                            children: [{
                                id: res.parameter_id,
                                label: res.parameter_name,
                            }]
                        }]
                    })
                    brand_id=res.brand_id
                    model_id=res.model_id
                }else{
                    if(res.model_id!=model_id){
                        params.filter(item=>{
                            if(item.id==brand_id){
                                item.children.push({
                                    id: res.model_id,
                                    label: res.model_name,
                                    children: [{
                                        id: res.parameter_id,
                                        label: res.parameter_name,
                                    }]
                                })
                            }
                        })
                        model_id=res.model_id
                    }else{
                        params.filter(value=>{
                            if(value.id==res.brand_id){
                                value.children.filter(item=>{
                                    if(item.id==res.model_id){
                                        item.children.push({
                                            id: res.parameter_id,
                                            label: res.parameter_name,
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
            this.data5  = JSON.parse(JSON.stringify(params))
            params.filter(res=>{
                res.children.filter(item=>{
                    item.children.filter(value=>{
                        this.carNum++
                    })
                })
            })
            localStorage.removeItem('trialModelsModal')
        },
        changeABC(index,value){   //锚点的切换
            this.changeabc=index
            var obj = document.getElementById(value);
            var box = document.getElementById('box');
            var abcbox = document.getElementById('abcBox');
            let top = obj.offsetTop-abcbox.offsetHeight-90
            box.scrollTop=top
        },
        Modellist(id,index){   //获得车款
            if(this.keepID==id){
                this.modellists = []
                this.keepID=-1
            }else{
                this.keepID=id
                if(index<3){
                    this.BrandsID=this.mainbrandlist[index].id
                    this.BrandsName=this.mainbrandlist[index].name
                }else{
                    this.BrandsID=this.Brands[index-3].id
                    this.BrandsName=this.Brands[index-3].name
                }
                this.indexx=index
                let data = {
                    brandId:id
                }
                modellist(data).then(res=>{
                    this.modellists = res.data.data
                })
            }
        },
        getYourMoney(id,name){   //获取年款
            this.CarmodelsID=id
            this.CarmodelsName=name
            this.carID = id
            this.YearParameterList = []
            let data = {
                modelId:id
            }
            getalistofyears(data).then(res=>{
                this.getYearList = res.data.data
                this.caryearlist(res.data.data[0].year,0)
            })
        },
        caryearlist(year,index){   //获取年款对象
            this.yearStyle = year
            this.yearIndex=index
            let data = {
                modelId:this.carID,
                year:year
            }
            getYearParameterList(data).then(res=>{
                this.YearParameterList = res.data.data
                this.YearParameterList.filter(o=>{
                    params.filter(res=>{
                        res.children.filter(item=>{
                            item.children.filter(value=>{
                                if(o.id==value.id){
                                    return o.select=true
                                }
                            })
                        })
                    })
                })  
            })
        },
        selectModel(index,id,name){  //选择车型
            this.modelsId = id
            this.CarseriesID = id
            this.CarseriesName = this.yearStyle+"款 "+name

            if(params.length==0){
                params.push({
                    id: this.BrandsID,
                    label:this.BrandsName,
                    children: [{
                        id: this.CarmodelsID,
                        label: this.CarmodelsName,
                        children: [{
                            id: this.CarseriesID,
                            label: this.CarseriesName,
                            year:this.yearStyle
                        }]
                    }]
                })
                this.carNum++
            }else{
                let Brandsyes = true
                params.filter(res=>{
                    if(res.id==this.BrandsID){  //如果品牌出现相同
                        Brandsyes = false
                        let Carmodelsyes=true
                        res.children.filter(item=>{
                            if(item.id==this.CarmodelsID){ //如果车款出现相同
                                Carmodelsyes=false
                                let Carseryes = true
                                let indexone = -1
                                item.children.filter((value,index)=>{
                                    if(value.id==this.CarseriesID){ //如果车系出现相同
                                        Carseryes=false
                                        indexone = index
                                    }
                                })
                                if(Carseryes){
                                    item.children.push({id: this.CarseriesID,label:this.CarseriesName,year:this.yearStyle})
                                    this.carNum++
                                }else{
                                    item.children.splice(indexone,1)
                                }
                            }
                        })
                        if(Carmodelsyes){
                            res.children.push({id: this.CarmodelsID,label: this.CarmodelsName,children: [{id: this.CarseriesID,label: this.CarseriesName,year:this.yearStyle}]})
                            this.carNum++
                        }
                    }
                })
                if(Brandsyes){
                    params.push({
                        id: this.BrandsID,
                        label:this.BrandsName,
                        children: [{
                            id: this.CarmodelsID,
                            label: this.CarmodelsName,
                            children: [{
                                id: this.CarseriesID,
                                label: this.CarseriesName,
                                year:this.yearStyle
                            }]
                        }]
                    })
                this.carNum++
                }
            }
            this.data5  = JSON.parse(JSON.stringify(params))
            
            this.caryearlist(this.yearStyle,this.yearIndex)
        },
        remove(node, data) {    //删除选中车型
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
            
            let id = data.id
            params.filter((res,index1)=>{
                if(res.id == id){
                    params.splice(index1,1)
                }else{
                    res.children.filter((item,index2)=>{
                        if(item.id == id){
                            params[index1].children.splice(index2,1)
                            if(params[index1].children.length==0){
                                params.splice(index1,1)
                                this.data5  = JSON.parse(JSON.stringify(params))
                            }
                        }else{
                            item.children.filter((value,index3)=>{
                                if(value.id == id){
                                    params[index1].children[index2].children.splice(index3,1)
                                    if(params[index1].children[index2].children.length==0){
                                        params[index1].children.splice(index2,1)
                                        this.data5  = JSON.parse(JSON.stringify(params))
                                    }
                                    if(params[index1].children.length==0){
                                        params.splice(index1,1)
                                        this.data5  = JSON.parse(JSON.stringify(params))
                                    }
                                }
                            })
                        }
                    })
                }
            })
            this.Calculatedquantity()
            this.caryearlist(this.yearStyle,this.yearIndex)
        },
        AddCar(){   //手动添加车型
            if(params.length==0){
                params.push({
                    id: this.BrandsID,
                    label:this.BrandsName,
                    children: [{
                        id: this.CarmodelsID,
                        label: this.CarmodelsName,
                        children: [{
                            label: this.addCar,
                            isBuildin:true
                        }]
                    }]
                })
                this.carNum++
            }else{
                let Brandsyes = true
                params.filter(res=>{
                    if(res.id==this.BrandsID){  //如果品牌出现相同
                        Brandsyes = false
                        let Carmodelsyes=true
                        res.children.filter(item=>{
                            if(item.id==this.CarmodelsID){ //如果车款出现相同
                                Carmodelsyes=false
                                let Carseryes = true
                                item.children.filter(value=>{
                                    if(value.label==this.addCar){ //如果车系出现相同
                                        Carseryes=false
                                    }
                                })
                                if(Carseryes){
                                    item.children.push({label:this.addCar,isBuildin:true})
                                    this.carNum++
                                }
                            }
                        })
                        if(Carmodelsyes){
                            res.children.push({id: this.CarmodelsID,label: this.CarmodelsName,children: [{label: this.addCar,isBuildin:true}]})
                            this.carNum++
                        }
                    }
                })
                if(Brandsyes){
                    params.push({
                        id: this.BrandsID,
                        label:this.BrandsName,
                        children: [{
                            id: this.CarmodelsID,
                            label: this.CarmodelsName,
                            children: [{
                                label: this.addCar,
                                isBuildin:true
                            }]
                        }]
                    })
                this.carNum++
                }
            }
            this.data5  = JSON.parse(JSON.stringify(params))
        },
        Calculatedquantity(){   //计算选中个数
            let num=0
            params.filter(o=>{
                o.children.filter(value=>{
                    value.children.filter(item=>{
                        num++
                    })
                })
            })
            this.carNum=num
        },
        save(){ //保存
            if(params.length==0){
                this.$message.error("请选择车型")
            }else{
                let list = ''
                params.filter(res=>{
                    res.children.filter(item=>{
                        item.children.filter(value=>{
                            let is_buildin = true
                            if(!value.id){
                                is_buildin = false
                            }
                            list = {
                                brand_id:res.id,
                                brand_name:res.label,
                                content:res.label+item.label+' '+value.label,
                                is_buildin:is_buildin,
                                model_id:item.id,
                                model_name:item.label,
                                parameter_id:value.id,
                                parameter_name:value.label,
                            }
                            this.carList.push(list)
                        })
                    })
                })
                localStorage.carList = JSON.stringify(this.carList)
                this.$router.go(-1)
            }
        }
    },
}

</script>

<style lang="stylus" scoped>
    .applicableModels{
        .el-header .el-breadcrumb{
            line-height:60px
        }
        .el-main{
            margin-top: 10px;
            margin-left: 10px;
            .top-header{
                width:20%;
                li{
                    display inline-block
                    width:23px;
                    height:23px;
                    border 1px solid #ccc;
                    text-align center
                    margin-right 5px
                    margin-bottom 5px
                    cursor pointer
                }
                .changeabc{
                    background-color #1491f2
                    color #fff
                }
            }
            .main{
                display flex
                .main-one{
                    width 18%
                    height 800px
                    border 1px solid #ccc
                    overflow auto
                    .pointer{
                        cursor pointer
                    }
                    .mainBrand{
                        background-color #cfbf51
                        line-height 30px
                        padding-left 10px
                        .model{
                            background-color #f2f2f2
                            border-top 1px solid #cccccc
                            border-bottom 1px solid #cccccc
                            margin-left -10px
                            padding-left 10px
                            ul{
                                background-color #fff
                                margin-left -10px
                                padding-left 10px
                                li{
                                    margin-left -10px
                                    padding-left 20px
                                }
                                li:hover{
                                    background-color #1491f2
                                    color #fff
                                    cursor pointer
                                }
                            }
                        }
                    }
                    .ABCBrand{
                        background-color #ccc
                        line-height 30px
                        padding-left 10px
                        color #1491f2
                        font-weight 900
                        font-size 17px;
                        border-bottom 1px solid #ccc
                        .ABCBrand-model{
                            fons 16px
                            font-weight normal
                            color #000
                            li{
                                background-color #f2f2f2
                                margin-left -10px
                                padding-left 10px
                                ul li{
                                    background-color #fff
                                    margin-left -10px
                                    padding-left 30px
                                }
                                li:hover{
                                    background-color #1491f2
                                    color #fff
                                    cursor pointer
                                }
                            }
                        }
                    }
                }
                .main-two{
                    width 35%
                    height 800px
                    margin-left 20px
                    .input{
                        width 85%
                        height 30px
                        border 1       
                        outline none
                        font-size 16px
                        padding-left 5px      
                        margin-bottom 10px           
                    }
                    .btn{
                        width 15%
                        height 30px
                        padding 0
                        background-color #1491f2
                        color #fff
                        border 1px solid #1491f2
                    }
                    .main{
                        width 100%
                        height 770px
                        overflow auto
                        .Nodata{
                            display inline-block
                            width 200px
                            color #ccc
                        }
                        .left{
                            width 50px
                            li{
                                width 100%
                                height 30px
                                text-align center
                                line-height 30px
                                border 1px solid #ccc
                                cursor pointer
                            }
                            .yearLi{
                                background-color #1491f2
                                color #fff
                            }
                        }
                        .right{
                            width 90%
                            margin-left 10px
                            li{
                                border-bottom 1px solid #ccc
                                height 30px
                                line-height 30px
                                cursor pointer
                            }
                            .el-button{
                                margin-top 10px
                            }
                        }
                    }
                }
                .main-three{
                    width 35%
                    height 800px
                    margin-left 20px
                    .top{
                        width 100%
                        height 30px
                        background-color #f2f2f2
                        line-height 30px
                        padding-left 20px
                    }
                    .carList{
                        width 100%
                        height 730px;
                        background-color #f8f8f8
                        overflow auto
                    }
                    .btn{
                        width 100%
                        height 40px
                        background-color #1491f2
                        border none
                        color #fff
                    }
                }
            }
            .custom-tree-node {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                padding-right: 8px;
                .cha{
                    display inline-block
                    width 15px
                    height 15px
                    background-color #cccccc
                    color #fff
                    font-size 18px
                    line-height 15px
                    border-radius 50%
                }
            }
        }
        
    }
</style>
