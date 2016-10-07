# Rust

```rust
#[derive(Debug)]
struct Whatever
{
	data: bool,
}

fn foo(&mut x: &mut u64) -> bool
{
	x.eq(&5)
}

fn main()
{
	let mut a = 6;
	let x = Whatever
	{
		data: foo(&mut a),
	};
	println!("{:#?}",x);
}
```

