window.jQuery = function(selectorOrArray){
    let elements 
    if(typeof selectorOrArray ==='string'){
      if(selectorOrArray[0]==='<'){
          elements=[createElement(selectorOrArray)]
      }else{
          elements=document.querySelectorAll(selectorOrArray)
      }
        
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    function createElement(string){
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.children[0]
    }
    console.log(elements)
    return {
        oldApi:selectorOrArray.oldApi,
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return this
        },
        find(selector){
            let array=[]
            for(let i=0;i<elements.length;i++){
                array=array.concat(Array.from(elements[i].querySelectorAll(selector)))
                
            }
            array.oldApi =this
            return jQuery(array)
        },
        end(){
            
            return this.oldApi
        },
        each(fn,i){
            for(let i =0;i<elements.length;i++){
                fn(elements[i],i)
            }
        },
        parent(){
            const array=[]
            this.each((node)=>{
                if(array.indexOf(node.parent)===-1){
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },
        children(){
            const array=[]
            this.each((node)=>{
                array.push(...node.children)
            })
            return jQuery(array)
        },
        print(){
            console.log(elements)
            return this
        },
        siblings(){
            const array=[]
            this.parent().children().each((node)=>{
                
               if(Array.from(elements).indexOf(node)===-1){
                   
                   array.push(node)
               }
            })
           
            
            return jQuery(array)
        },
        index(){
            let array=[]
            let i=0
            this.parent().children().each((node,i)=>{
               if(Array.from(elements).indexOf(node)!==-1){
                   
                   array.push(i)
               }
            })
           
           console.log(array)
            return jQuery(array)

        },
        next(){
            let array=[]
            
            this.each((node)=>{
                if(Array.from(elements).indexOf(node)!==-1){
                    let x =node.nextSibling
                   while(x&&x.nodeType ===3){
                       x=x.nextSibling
                   }
                   array.push(x)
                   
               }
            })
            
            return jQuery(array)
        },
        prev(){
            let array=[]
            
            this.each((node)=>{
                if(Array.from(elements).indexOf(node)!==-1){
                    let x =node.previousSibling
                   while(x&&x.nodeType ===3){
                       x=x.previousSibling
                   }
                   array.push(x)
                   
               }
            })
            
            return jQuery(array)
        },


        
    }
}
window.$=window.jQuery