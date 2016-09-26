document.addEventListener('DOMContentLoaded',function()
{
	var converter = new Markdown.Converter();
	var DONE = this.DONE || 4;

	var loadpost = function(file)
	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if(this.readyState === DONE && this.status === 200)
			{
				var oldcenter = document.getElementById('center');
				var newcenter = document.createElement('div');
				var backlink = document.createElement('a');
				var post = document.createElement('div');

				backlink.href = '.';
				backlink.innerText = 'Back to Posts';

				post.innerHTML = converter.makeHtml(xhr.responseText);

				newcenter.id = 'center';
				newcenter.appendChild(backlink);
				newcenter.appendChild(post);

				oldcenter.replaceWith(newcenter);
			}
		};
		xhr.open('GET',file,true);
		xhr.send();
		return false;
	};

	var loadpostlist = function()
	{
		var recvposts = function()
		{
			if(this.readyState === DONE && this.status === 200)
			{
				var oldcenter = document.getElementById('center');
				var newcenter = document.createElement('div');
				var header = document.createElement('h1');
				var list = document.createElement('ul');

				var lines = xhr.responseText.split('\n');
				lines
					.map(function(line)
					{
						return line.trim();
					})
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

						link.href = '#'+encodeURIComponent(file);
						link.innerText = title;
						link.onclick = function()
						{
							window.location.href = link.href;
							window.location.reload();
						};

						li.appendChild(link);
						list.appendChild(li);
					});

				header.innerText = 'Blog Posts:';

				newcenter.id = 'center';
				newcenter.innerHTML = '';
				newcenter.appendChild(header);
				newcenter.appendChild(list);
				oldcenter.replaceWith(newcenter);
			}
		}

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = recvposts;
		xhr.open('GET','posts.txt',true);
		xhr.send();
		return false;
	};

	if(window.location.hash === "" || window.location.hash === "#")
	{
		loadpostlist();
	}
	else
	{
		loadpost(window.location.hash.substr(1));
	}
});

