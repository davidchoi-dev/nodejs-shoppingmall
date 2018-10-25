function* iterFunc(){
    yield console.log('1');
    yield console.log('2');
    yield console.log('3');
    yield console.log('4');
}

var iter = iterFunc();
iter.next();
iter.next();
iter.next();
iter.next();
iter.next();
iter.next();