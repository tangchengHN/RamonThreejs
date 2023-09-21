import Experience from "../Experience"
import AxesHelper from "../Utils/AxesHelper"
import Environments from "./Environments"
import InfoPanel from "./InfoPanel"
import Base from "./Base"
import Huoqie from "./Huoqie"
import LiftingDevice from "./LiftingDevice"
import Billets from "./Billets"

// 单例模式变量
var instance = null

/**
 * World 是整个物体世界的集合，所有物体都应该在 World 创建，
 * 由 World 去管理、驱动他们。
 * 
 * Experience 项目不直接与物体打交道，而是只引用 World，
 * 来生成环境、物体等元素
 */
export default class World {
	constructor(experience) {

		// 单例模式
		if (instance) {
			return instance
		}
		instance = this

		// 绑定 Experience 项目
		this.bindExperience(experience)

		// 添加环境
		this.environments = new Environments()

		// 模型集合，World 中的所有模型都放在 models 里面
		this.models = {}

		this.models["Base"] = new Base()
		this.models["Huoqie"] = new Huoqie()
		this.models["LiftingDevice"] = new LiftingDevice()
		// 资源加载完成后，开始生成 World 中的物体
		this.resources.on("sourceReady", (name) => {
			if (this.models["Base"].modelList.includes(name)) {
				this.models["Base"].loadModel(name)
			}
			if (this.models["Huoqie"].modelList.includes(name)) {
				this.models["Huoqie"].loadModel(name)
			}
			if (this.models["LiftingDevice"].modelList.includes(name)) {
				this.models["LiftingDevice"].loadModel(name)
			}
		})

		var billet1 = new Billets()

		this.models["Billets"] = billet1

		// this.models["Billets"].push(new)

		// 添加坐标轴
		this.axeshelper = new AxesHelper(3)
		this.scene.add(this.axeshelper)

		if (this.debug.active) {
			this.setDebug()
		}
	}

	/**
	 * 绑定 Experience 项目
	 * @param {Experience} experience 
	 */
	bindExperience(experience) {
		this.experience = experience
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.debug = this.experience.debug
	}

	/**
	 * 设置 Debug 面板，在网址后添加 "/#debug" 即可开启
	 * 网页右上角的 debug 面板。
	 * 
	 * 函数中给面板添加了2个可折叠文件夹，control 和  material
	 * 分别用来调整动画开关和辊道线框颜色
	 */
	setDebug() {
		// this.debug.debugObject["Animate"] = false
		// var controlFolder = this.debug.ui.addFolder("control")
		// controlFolder.add(this.debug.debugObject, "Animate")
		
		// var materialFolder = this.debug.ui.addFolder("material")
		// this.debug.debugObject["edgeColor"] = "#FFFFFF"
		// materialFolder
		// .addColor(this.debug.debugObject, "edgeColor")
		// .onChange(() => {
		// 	this.models["GunDao"].changeEdgeColor(this.debug.debugObject["edgeColor"])
		// })


		// this.debug.debugObject["一流"] = "下降"
		// this.debug.debugObject["二流"] = "上升"
		// var controlFolder = this.debug.ui.addFolder("升降杆")

		// controlFolder.add(this.debug.debugObject, "一流", ["上升", "下降"]).onChange((value)=>{
		// 	console.log(value)
		// 	this.models["LiftingDevice"].cmd("LiftingDevice000", value)
		// })
		// controlFolder.add(this.debug.debugObject, "二流", ["上升", "下降"]).onChange((value)=>{
		// 	console.log(value)
		// 	this.models["LiftingDevice"].cmd("LiftingDevice001", value)
		// })

		
		var controlFolder = this.debug.ui.addFolder("一流")
		this.debug.debugObject["升降杆"] = "下降"
		controlFolder.add(this.debug.debugObject, "升降杆", ["上升", "下降"]).onChange((value)=>{
			console.log(value)
			this.models["LiftingDevice"].cmd("1", value)
		})

		this.debug.debugObject["钢坯控制"] = "复位"
		controlFolder.add(this.debug.debugObject, "钢坯控制", ["移动", "暂停","复位"]).onChange((value)=>{
			console.log(value)
			this.models["Billets"].cmd("1", value)
		})
		
		this.debug.debugObject["一切位置切割"] = false
		controlFolder.add(this.debug.debugObject, "一切位置切割").onChange((value)=>{
			console.log(value)
			this.models["Huoqie"].cmd("1", value?"一切位置切割":"");
			// this.models["Billets"].cmd("1", value?"一切位置切割":"");
		})
		this.debug.debugObject["二切位置切割"] = false
		controlFolder.add(this.debug.debugObject, "二切位置切割").onChange((value)=>{
			console.log(value)
			this.models["Huoqie"].cmd("1", value);
		})


		
		var controlFolder = this.debug.ui.addFolder("二流")
		this.debug.debugObject["升降杆"] = "下降"
		controlFolder.add(this.debug.debugObject, "升降杆", ["上升", "下降"]).onChange((value)=>{
			console.log(value)
			this.models["LiftingDevice"].cmd("2", value)
		})

		this.debug.debugObject["钢坯控制"] = "复位"
		controlFolder.add(this.debug.debugObject, "钢坯控制", ["移动", "暂停","复位"]).onChange((value)=>{
			console.log(value)
			this.models["Billets"].cmd("2", value)
		})
		
		this.debug.debugObject["一切位置切割"] = false
		controlFolder.add(this.debug.debugObject, "一切位置切割").onChange((value)=>{
			console.log(value)
			this.models["Huoqie"].cmd("2", value);
		})
		this.debug.debugObject["二切位置切割"] = false
		controlFolder.add(this.debug.debugObject, "二切位置切割").onChange((value)=>{
			console.log(value)
			this.models["Huoqie"].cmd("2", value);
		})

	}

	/**
	 * World.update() 会在 Experience.update 中调用，
	 * 每一帧都会执行 update 函数，我们把由 mesh.position 
	 * 或 mesh.rotation 实现的动画逻辑在 update() 中调用
	 * 
	 * 但若是 gsap 动画就不需要放在 update 中更新，因为 gsap 动画会自动
	 * 每一帧都执行。gsap只需要触发并规定动画持续时间即可，不需写在update中
	 * 手动刷新每一帧。
	 */
	update() {
	}
}
