# EventLoop事件循环

JS是单线程的。

1.先将同步代码压入执行栈重，依次执行

2.将异步代码推入异步队列，异步队列氛围红任务队列和微任务队列。

3.微任务队列要优于宏任务队列。

4.微任务：Promise.then MutationObserver，

5.宏任务：setImmediate setTimeout setInterval。

在浏览器环境中，有JS引擎和渲染线程，且两个线程互斥。不同任务进入不同Event Queue队列。 当主线程结束，先执行准备好的微任务，然后再执行准备好的宏任务，一个轮询结束。

## 浏览器中的事件环

事件环的运行机制是，先会执行栈中的内容，栈中的内容执行后执行微任务，微任务清空后再执行宏任务，先取出一个宏任务，再去执行微任务，然后在取宏任务清微任务这样不停的循环。

- eventLoop 是由JS的宿主环境（浏览器）来实现的；
- 事件循环可以简单的描述为以下四个步骤:

1.函数入栈，当Stack执行到异步任务的时候，就将他丢给WebAPIs，接着执行同步任务，直到Stack为空。

2.此期间WebAPIs完成这个事件，把回调函数放入队列中等待执行（微任务翻到微任务队列，宏任务放到宏任务队列）

3.执行栈为空时，Event Loop把为什么队列执行清空。

4.微任务队列清空后，进入宏任务队列，取出一项执行，执行完成后检查微任务队列是否有任务，如果有优先执行完微任务队列的任务。如此周而复始就循环，直到所有任务都清空。

![](D:\frontEnd\rookieLoadJS\basic\img\20221012-150615.jpg)

浏览器中的任务源(task):

- `宏任务(macrotask)`：
   宿主环境提供的，比如浏览器
   ajax、setTimeout、setInterval、setTmmediate(只兼容ie)、script、requestAnimationFrame、messageChannel、UI渲染、一些浏览器api
- `微任务(microtask)`：
   语言本身提供的，比如promise.then
   then、queueMicrotask(基于then)、mutationObserver(浏览器提供)、messageChannel 、mutationObersve

## **Node 环境中的事件环（Event Loop)**

暂未接触，待学习