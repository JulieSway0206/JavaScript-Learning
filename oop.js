var number1, number2;
number1 = 3;
number2 = number1;
number2 = 42;/** number1 is not affected **/

 /** object **/
var object1, object2;
object1 = {a: 3};
object2 = object1;/** copy the reference **/
object2 = 42;/** object1 is not affected **/

/** inheritance  prototype model**/
var parent = {
    get: function fn() {
        return this.val;

    },
    val: 42
};

var child = Object.create(parent);
child.val = 3;
var grandchild = Object.create(child);
parent.get(); /** 42 **/
child.get(); /** 3 **/
grandchild.get(); /** 3 **/

var answer = {
    get: function fn1() {
        return this.val;
    },
        val: 42
    };
var firmAnswer = Object.create(answer);
console.log(firmAnswer.val);
firmAnswer.get = function fn2() {
    return this.val + "!!";
};
answer.get(); //42
console.log(firmAnswer.get()); //42!!
// var firmAnswer = Object.create(answer);
// firmAnswer.get = function fn2() {
//     return answer.get.call(this) + "!!";
// };
// firmAnswer.val = 3;
// firmAnswer.get();//3!!
var AnswerPrototype = {
    get: function fn1(){
        return this.val;
    }
};
var lifeAnswer = Object.create(AnswerPrototype);
lifeAnswer.val = 42;
lifeAnswer.get();//42
/** add initialization function **/
// var AnswerPrototype = {
//     constructor: function fn0(value){
//         this._val = value;
//     },
//     get: function fn1() {
//         return this._val;
//
//     }
// };
// var lifeAnswer = Object.create(AnswerPrototype);
// lifeAnswer.constructor(42);
// lifeAnswer.get(); //42
/** _val: a common convention in JS to say that a property is
 private. In other words, you should not access or change this
 property. **/
/** classical model **/
/** When you define a function, JavaScript creates an object with
 name, length, and prototype properties. That prototype property
 actually points to a whole another new object with a constructor
 property that points back to the function you've just created.
 fn0.prototype            fn0[]
 constructor fn0[]     name  "fn0"
 object          -->   length 0
                 <--   prototype fn0.prototype
                       function
so the common convention in JS is that, if it is meant to be a
 constructor, it starts with a lower case letter, if it is meant to
 be a normal function, then you start with a capital letter. **/
function Answer(value){
    this._val = value;
}
Answer.prototype.get = function fn1() {
    return this._val;
};
var magicAnswer = new Answer(42);
magicAnswer.get();//42
/** subclass **/
function LuckyAnswer(value) {
    Answer.call(this, value);

}// We start out by creating a LuckyAnswer constructor first.
/**JS will automatically create the LuckyAnswer.prototype, but
this one we cannot use because we need our LuckyAnswer.prototype
 to extend Answer.prototype- and it doesn't. So we will set LuckyAnswer.prototype
 to a new object that we will create by extending Answer.prototype. Next, we will set
 the constructor property to point back to LuckyAnswer.**/
LuckyAnswer.prototype = Object.create(Answer.prototype);
LuckyAnswer.prototype.constructor = LuckyAnswer;
//Now we need to set our get method on it.
LuckyAnswer.prototype.get = function fn2() {
    return Answer.prototype.get.call(this) + "!!";

};
/** static members **/
function Circle(radius) {
    // instance field
    this.Radius = radius;
    // static field
    Circle.PI = 3.141;
    this.CalculateArea = function()
    {
        return Circle.PI * this.Radius * this.Radius;
    }

}
var circleObject = new Circle(10);
console.log("Area =" + circleObject.CalculateArea());
/** comparison **/
// function Shape(shapeName)
// {
//     this.ShapeName = shapeName;
//     this.Count = ++this.Count || 1/**if this.Count doesn't
//  exist, this.Count == 1**/
//     this.ShowCount = function () {
//         return this.Count;
//
//     }
// }
// var shape1 = new Shape("Circle");
// var shape2 = new Shape("Rectangle");
// console.log("Shape Count = " + shape2.ShowCount());
//"Shape Count = 1"
function Shape(shapeName)
{
    this.ShapeName = shapeName;
    Shape.Count = ++Shape.Count || 1;/**if this.Count doesn't
 exist, this.Count == 1**/
//static method
Shape.ShowCount = function () {
    return Shape.Count;

}
}
var shape1 = new Shape("Circle");
var shape2 = new Shape("Rectangle");
console.log("Shape Count = " + Shape.ShowCount());
//Shape Count = 2
