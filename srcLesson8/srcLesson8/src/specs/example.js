'use string';

describe('Example', () =>{
	let a = null;

	it("значение должно быть определено", ()=> {
		expect(window.document).toBeDefined()
	})

	it("значение должно быть null", ()=>{
		expect(a).toBeNull()
	})

	it("значение должно быть не определено", ()=>{
		expect(window.notExist).toBeUndefined()
	})

	it("значение должно быть верно", () => {
		expect(5>2).toBeTruthy()
	})

	it ("значение должно быть меньше чем", ()=> {
		expect (1+2).toBeLessThan(5)
	})

	it ("значение должно быть больше чем", ()=> {
		expect (1+2).toBeGreaterThan(0)
	})

	it ("значение должно быть близко к числу", ()=> {
		expect (1.2345).toBeCloseTo(1.2, 1)
	})

	it ("значение должно соответствовать регулярному выражению", ()=> {
		expect ("some string").toMatch(/string/)
	})


	it ("значение должно содержать", ()=> {
		expect ([1,2,3]).toContain(2)
	})

	it ("значение должно содержать строку", ()=> {
		expect ("some string").toContain("some")
	})

	it ("должно быть вызвано исключение", ()=> {
		let func = () => window.notExist.value
		expect (func).toThrow()
	})


})