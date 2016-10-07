# Rust

```rust
#[derive(Debug)]
struct Whatever
{
	data: bool,
}

fn foo(x: &mut u64) -> bool
{
	x.cmp(5)
}

fn main()
{
	let a = 6;
	let x = Whatever
	{
		data: foo(&mut a),
	};
	println!("{:#?}",x);
}
```

