document.addEventListener('DOMContentLoaded',function()
{
	var converter = new Markdown.Converter();
	var xhr = new XMLHttpRequest();
	var DONE = this.DONE || 4;
	xhr.onreadystatechange = function()
	{
		if(this.readyState === DONE && this.status === 200)
		{
			var list = document.getElementById('postlist');
			var lines = xhr.responseText.split('\n');
			lines.map(String.trim)
				.filter(function(line)
				{
					return line.length > 0;
				})
				.forEach(function(line)
				{
					var index = line.indexOf(';');
					var file = line.substr(0,index);
					var title = line.substr(index+1);

					var li = document.createElement('li');
					var link = document.createElement('a');

					link.href = '#';
					link.innerText = title;
					link.onclick = function()
					{
						var xhr = new XMLHttpRequest();
						xhr.onreadystatechange = function()
						{
							if(this.readyState === DONE && this.status === 200)
							{
								document.getElementById('backlink').style.display = 'block';
								var center = document.getElementById('post');
								center.innerHTML = converter.makeHtml(xhr.responseText);
							}
						};
						xhr.open('GET',file,true);
						xhr.send();
						return false;
					};

					li.appendChild(link);
					list.appendChild(li);
				});
		}
	}
	xhr.open('GET','posts.txt',true);
	xhr.send();
});

