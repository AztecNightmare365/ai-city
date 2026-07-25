import{A as e,B as t,C as n,D as r,E as i,F as a,G as o,H as s,I as c,N as l,O as u,S as d,U as f,W as p,_ as m,a as h,c as g,d as _,f as v,h as y,i as ee,k as te,l as b,n as x,o as S,p as C,r as w,s as T,t as E,v as D,w as O,x as ne,y as re}from"./BufferGeometryUtils-CQT_ibYB.js";var k={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},A=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},j=new i(-1,1,1,-1,0,1),M=new class extends T{constructor(){super(),this.setAttribute(`position`,new y([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new y([0,2,0,0,2,0],2))}},N=class{constructor(e){this._mesh=new d(M,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,j)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},P=class extends A{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof c?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=s.clone(e.uniforms),this.material=new c({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new N(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},F=class extends A{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},I=class extends A{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},L=class{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){let t=e.getSize(new f);this._width=t.width,this._height=t.height,n=new o(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:D}),n.texture.name=`EffectComposer.rt1`}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new P(k),this.copyPass.material.blending=0,this.timer=new t}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}F!==void 0&&(r instanceof F?n=!0:r instanceof I&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new f);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},R=class extends A{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new _}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},z={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new _(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},B=class e extends A{constructor(e,t=1,r,i){super(),this.strength=t,this.radius=r,this.threshold=i,this.resolution=e===void 0?new f(256,256):new f(e.x,e.y),this.clearColor=new _(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);this.renderTargetBright=new o(a,l,{type:D}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new o(a,l,{type:D});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new o(a,l,{type:D});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),a=Math.round(a/2),l=Math.round(l/2)}let u=z;this.highPassUniforms=s.clone(u.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new c({uniforms:this.highPassUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader}),this.separableBlurMaterials=[];let d=[6,10,14,18,22];a=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(d[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new f(1/a,1/l),a=Math.round(a/2),l=Math.round(l/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let m=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=m,this.bloomTintColors=[new p(1,1,1),new p(1,1,1),new p(1,1,1),new p(1,1,1),new p(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=s.clone(k.uniforms),this.blendMaterial=new c({uniforms:this.copyUniforms,vertexShader:k.vertexShader,fragmentShader:k.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new _,this._oldClearAlpha=1,this._basic=new n,this._fsQuad=new N(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new f(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new c({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new f(.5,.5)},direction:{value:new f(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new c({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};B.BlurDirectionX=new f(1,0),B.BlurDirectionY=new f(0,1);var V={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},H=class extends A{constructor(){super(),this.isOutputPass=!0,this.uniforms=s.clone(V.uniforms),this.material=new e({name:V.name,uniforms:this.uniforms,vertexShader:V.vertexShader,fragmentShader:V.fragmentShader}),this._fsQuad=new N(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},v.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},U={yellow:16765952,amber:16751104,red:16720950,magenta:16723870,pink:16740039,cyan:2285823,teal:2087360,green:5111642,blue:3107839,violet:10181887,white:15922943},W=723728,G=526348,K=1184280,q=(()=>{let e=20260725;return()=>(e=e*48271%2147483647)/2147483647})(),J=(e,t,n,r=0,i=0,a=0)=>{let o=new S(e,t,n);return o.translate(r,i,a),o},Y=e=>new O({flatShading:!0,...e}),X=(e,t=1)=>new n({color:e,transparent:t<1,opacity:t}),Z=.22;function ie(e,t,n){switch(e){case`+z`:return{ax:`x`,span:t,off:n/2+Z,rot:0};case`-z`:return{ax:`x`,span:t,off:-(n/2+Z),rot:0};case`+x`:return{ax:`z`,span:n,off:t/2+Z,rot:Math.PI/2};default:return{ax:`z`,span:n,off:-(t/2+Z),rot:Math.PI/2}}}function Q(e,t,n,r,i,a,o){let s=ie(e,t,n);return s.ax===`x`?J(r,i,.18,a,o,s.off):J(.18,i,r,s.off,o,a)}var ae={panel:({face:e,w:t,d:n,gw:r,gh:i,cx:a,cy:o,hue:s})=>[Q(e,t,n,r,i,a,o)],matrix:({face:e,w:t,d:n,gw:r,gh:i,cx:a,cy:o,cols:s=7,rows:c=7,fill:l=.55})=>{let u=[],d=r/s,f=i/c;for(let p=0;p<c;p++)for(let c=0;c<s;c++)q()>l||u.push(Q(e,t,n,d*.72,f*.72,a-r/2+d*(c+.5),o-i/2+f*(p+.5)));return u},bars:({face:e,w:t,d:n,gw:r,gh:i,cx:a,cy:o,n:s=4})=>{let c=[],l=i/s;for(let u=0;u<s;u++)c.push(Q(e,t,n,r,l*.36,a,o-i/2+l*(u+.5)));return c},strips:({face:e,w:t,d:n,gw:r,gh:i,cx:a,cy:o,n:s=5})=>{let c=[],l=r/s;for(let u=0;u<s;u++)c.push(Q(e,t,n,l*.3,i,a-r/2+l*(u+.5),o));return c},frame:({face:e,w:t,d:n,gw:r,gh:i,cx:a,cy:o,t:s=.34})=>[Q(e,t,n,r,s,a,o+i/2),Q(e,t,n,r,s,a,o-i/2),Q(e,t,n,s,i,a-r/2,o),Q(e,t,n,s,i,a+r/2,o)],windows:({face:e,w:t,d:n,gw:r,gh:i,cx:a,cy:o,cols:s=3,rows:c=4,fill:l=.8})=>{let u=[],d=r/s,f=i/c;for(let p=0;p<c;p++)for(let c=0;c<s;c++)q()>l||u.push(Q(e,t,n,d*.5,f*.52,a-r/2+d*(c+.5),o-i/2+f*(p+.5)));return u}},oe=[{x:-13,z:2,w:9,h:5,d:8,crown:{hue:U.white,h:.6},decals:[{kind:`panel`,face:`+z`,hue:U.yellow,gw:6.4,gh:2.1,cx:0,cy:3.2},{kind:`panel`,face:`+z`,hue:U.red,gw:4.4,gh:1.1,cx:0,cy:3.2},{kind:`windows`,face:`+x`,hue:U.amber,gw:5.5,gh:3,cx:0,cy:2.4,cols:4,rows:2}]},{x:-13,z:2,y:5,w:8.4,h:5.5,d:7.6,decals:[{kind:`matrix`,face:`+z`,hue:U.blue,gw:6.4,gh:3.6,cx:0,cy:2.9,cols:8,rows:5,fill:.5},{kind:`bars`,face:`+x`,hue:U.cyan,gw:5,gh:2.6,cx:0,cy:3,n:3}]},{x:-13,z:2,y:10.5,w:6.6,h:3.4,d:6,decals:[{kind:`frame`,face:`+z`,hue:U.cyan,gw:4.6,gh:2.2,cx:0,cy:1.7},{kind:`panel`,face:`+z`,hue:U.teal,gw:3,gh:1.2,cx:0,cy:1.7},{kind:`frame`,face:`+x`,hue:U.cyan,gw:4,gh:2,cx:0,cy:1.7}]},{x:-5,z:-1,w:7,h:15,d:7,decals:[{kind:`strips`,face:`+z`,hue:U.magenta,gw:5.6,gh:12,cx:0,cy:7},{kind:`strips`,face:`+x`,hue:U.green,gw:5.6,gh:11,cx:0,cy:6.5,n:4}]},{x:-5,z:-1,w:7.15,h:15,d:7.15,noBody:!0,decals:[{kind:`strips`,face:`+z`,hue:U.violet,gw:4.2,gh:10,cx:.7,cy:6.4,n:3}]},{x:3,z:-7,w:11,h:19,d:9,decals:[{kind:`panel`,face:`+z`,hue:U.yellow,gw:9.5,gh:.4,cx:0,cy:18.2},{kind:`panel`,face:`+z`,hue:U.yellow,gw:.4,gh:7,cx:-4.4,cy:14},{kind:`panel`,face:`+z`,hue:U.green,gw:2.6,gh:8.5,cx:2.4,cy:6},{kind:`bars`,face:`+x`,hue:U.amber,gw:7,gh:5,cx:0,cy:14,n:4}]},{x:12,z:-5,w:9,h:13,d:8,decals:[{kind:`matrix`,face:`+z`,hue:U.cyan,gw:7.4,gh:8.4,cx:0,cy:7.5,cols:9,rows:10,fill:.5},{kind:`panel`,face:`+x`,hue:U.red,gw:1.4,gh:9,cx:0,cy:7},{kind:`bars`,face:`+x`,hue:U.white,gw:3.4,gh:6,cx:1.8,cy:7,n:5}]},{x:20,z:1,w:8,h:9,d:8,decals:[{kind:`windows`,face:`+z`,hue:U.yellow,gw:6,gh:6,cx:0,cy:4,cols:3,rows:3},{kind:`bars`,face:`-x`,hue:U.green,gw:5.5,gh:3.6,cx:0,cy:5,n:3}]},{x:20,z:1,y:9,w:7,h:3.6,d:7,decals:[{kind:`frame`,face:`+z`,hue:U.pink,gw:5,gh:2.4,cx:0,cy:1.8},{kind:`frame`,face:`-x`,hue:U.magenta,gw:5,gh:2.4,cx:0,cy:1.8}]},{x:6,z:8,w:9,h:6.5,d:8,decals:[{kind:`panel`,face:`+z`,hue:U.red,gw:3.6,gh:1.8,cx:0,cy:4.6},{kind:`matrix`,face:`+z`,hue:U.white,gw:2.6,gh:1.1,cx:0,cy:4.6,cols:6,rows:3,fill:.55},{kind:`windows`,face:`+z`,hue:U.amber,gw:6.4,gh:2.4,cx:0,cy:1.8,cols:4,rows:2}]},{x:16,z:10,w:8.5,h:8,d:7.5,decals:[{kind:`bars`,face:`+z`,hue:U.green,gw:6.4,gh:2.6,cx:0,cy:6,n:2},{kind:`panel`,face:`+z`,hue:U.magenta,gw:6.4,gh:.32,cx:0,cy:4.1},{kind:`windows`,face:`+z`,hue:U.yellow,gw:6.4,gh:3,cx:0,cy:2.2,cols:4,rows:2},{kind:`matrix`,face:`+x`,hue:U.blue,gw:5,gh:4,cx:0,cy:4,cols:5,rows:5,fill:.45}]},{x:-21,z:8,w:7,h:3.4,d:6,body:1776418,decals:[{kind:`bars`,face:`+z`,hue:U.white,gw:5.4,gh:1.6,cx:0,cy:1.5,n:4}],awning:{hue:U.white,w:7.6,d:2.4,y:3.5}}];function $(e){let t=new m,n=[],r=[],i=new Map,a=(e,t)=>{i.has(e)||i.set(e,[]),i.get(e).push(t)},o=[];for(let e of oe){let t=e.y||0;e.noBody||(n.push(J(e.w,e.h,e.d,e.x,t+e.h/2,e.z)),r.push(J(e.w+.5,.35,e.d+.5,e.x,t+e.h+.17,e.z))),e.crown&&a(e.crown.hue,J(e.w*.5,e.crown.h,e.d*.5,e.x,t+e.h+.5,e.z)),e.awning&&(r.push(J(e.awning.w,.28,e.awning.d,e.x,t+e.awning.y,e.z+e.d/2+e.awning.d/2)),a(e.awning.hue,J(e.awning.w,.14,.3,e.x,t+e.awning.y-.2,e.z+e.d/2+e.awning.d)));for(let n of e.decals||[]){let r=ae[n.kind]({...n,w:e.w,d:e.d});for(let i of r)i.translate(e.x,t,e.z),a(n.hue,i)}let i=(e.decals||[])[0];i&&o.push({x:e.x,z:e.z,hue:i.hue,r:Math.max(e.w,e.d)*1.4})}t.add(new d(E(n,!1),Y({color:W,roughness:.72,metalness:.25}))),t.add(new d(E(r,!1),Y({color:G,roughness:.8,metalness:.2})));for(let[e,n]of i)t.add(new d(E(n,!1),X(e)));return t.add(se(o)),t.add(ce()),e.add(t),t}function se(e){let t=new m,n=1024,r=document.createElement(`canvas`);r.width=r.height=n;let i=r.getContext(`2d`);i.fillStyle=`#000`,i.fillRect(0,0,n,n),i.globalCompositeOperation=`lighter`;for(let t of e){let e=(t.x+60/2)/60*n,r=(t.z+60/2)/60*n,a=t.r/60*n,o=new _(t.hue),s=i.createRadialGradient(e,r,0,e,r,a);s.addColorStop(0,`rgba(${o.r*255|0},${o.g*255|0},${o.b*255|0},0.2)`),s.addColorStop(1,`rgba(0,0,0,0)`),i.fillStyle=s,i.beginPath(),i.arc(e,r,a,0,Math.PI*2),i.fill()}let a=new g(r);a.colorSpace=l;let o=new d(new S(60,1.6,60),Y({color:K,roughness:.9,metalness:.05}));o.position.y=-.8,t.add(o);let s=new d(new u(60,60),Y({color:K,roughness:.9,emissive:16777215,emissiveMap:a,emissiveIntensity:.5}));s.rotation.x=-Math.PI/2,s.position.y=.01,t.add(s);let c=[],f=new d(new u(60,9),Y({color:855314,roughness:.95}));f.rotation.x=-Math.PI/2,f.position.set(0,.02,19),t.add(f);for(let e=-6;e<=6;e++)c.push(J(3.2,.05,.4,e*4.4,.04,19));for(let e=0;e<6;e++)c.push(J(.9,.05,7.4,-12+e*1.8,.04,19));return t.add(new d(E(c,!1),X(14673647,.55))),t}function ce(){let e=new m,t=[],n=[],r=[],i=[],a=[];for(let e=-3;e<=3;e++)e&&(t.push(J(.22,4.4,.22,e*6.5,2.2,13.5)),n.push(J(1.1,.3,.42,e*6.5,4.4,13.5)));for(let[t,n]of[[-9,U.green],[4,U.blue]])r.push(J(3.6,1.1,1.7,t,.75,19)),r.push(J(1.9,.6,1.5,t,1.5,19)),a.push(J(.28,.28,.9,t+1.8,.85,19)),i.push(J(.28,.28,.9,t-1.8,.85,19)),e.add(new d(J(3.7,.3,1.8,t,1.35,19),X(n,.9)));e.add(new d(E(t,!1),Y({color:1381660,roughness:.8}))),e.add(new d(E(n,!1),X(16767392))),e.add(new d(E(r,!1),Y({color:1315868,roughness:.5,metalness:.5}))),e.add(new d(E(a,!1),X(16774368))),e.add(new d(E(i,!1),X(U.red)));let o=new re(new b(.24,.62,1,5),Y({color:2302766,roughness:.7,emissive:9075711,emissiveIntensity:.45}),34),s=new ne,c=new te,l=new p,u=new p(1,1,1);for(let e=0;e<34;e++)c.setFromAxisAngle(new p(0,1,0),q()*Math.PI*2),s.compose(l.set(-14+q()*26,.55,3+q()*9),c,u),o.setMatrixAt(e,s);return o.instanceMatrix.needsUpdate=!0,e.add(o),e}function le(e){let t=new a;t.background=new _(460555);let n=new r(34,1,.5,500),i=new w({canvas:e,antialias:!0});i.setPixelRatio(Math.min(devicePixelRatio,1.5)),i.toneMapping=4,i.toneMappingExposure=1,t.add(new h(1316900,.5));let o=new C(10467024,.5);o.position.set(-40,60,30),t.add(o),$(t);let s=new x(n,i.domElement);s.enableDamping=!0,s.target.set(0,5,2),n.position.set(52,42,52),s.maxPolarAngle=Math.PI*.49;let c=new L(i);c.addPass(new R(t,n));let l=new B(new f(1,1),.55,.5,.75);c.addPass(l),c.addPass(new H);function u(){let t=e.clientWidth||1,r=e.clientHeight||1;n.aspect=t/r,n.updateProjectionMatrix(),i.setSize(t,r,!1),c.setSize(t,r),l.setSize(t*.5,r*.5)}window.addEventListener(`resize`,u),u();let d=!0;window.addEventListener(`keydown`,e=>{e.code===`Space`&&(d=!d)}),s.addEventListener(`start`,()=>{d=!1});function p(){if(requestAnimationFrame(p),d){let e=performance.now()*6e-5;n.position.set(Math.cos(e)*72,44,Math.sin(e)*72)}s.update(),c.render()}return p(),window.__diorama={scene:t,camera:n,renderer:i,composer:c,controls:s,THREE:ee},{scene:t,camera:n,renderer:i}}le(document.querySelector(`#scene`));