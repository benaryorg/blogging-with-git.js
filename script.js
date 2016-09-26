document.addEventListener('DOMContentLoaded',function()
{
	var converter = window.markdownit
	({
		highlight: function(str,lang)
		{
			if(lang && hljs.getLanguage(lang))
			{
				try
				{
					return hljs.highlight(lang,str).value;
				}
				catch(__)
				{
				}
			}
			return '';
		}
	})
		.use(window.markdownitAbbr)
		.use(window.markdownitFootnote);

	var loadpost = function(file)
	{
		fetch(decodeURIComponent(file))
			.then(function(response)
			{
				return response.text();
			})
			.then(function(text)
			{
				var oldcenter = document.getElementById('center');
				var newcenter = document.createElement('div');
				var backlink = document.createElement('a');
				var post = document.createElement('div');

				backlink.href = '#';
				backlink.innerText = 'Back to Posts';
				backlink.onclick = function()
				{
					window.location.href = backlink.href;
					loadpostlist();
					return false;
				};

				post.innerHTML = converter.makeHtml(text);

				newcenter.id = 'center';
				newcenter.appendChild(backlink);
				newcenter.appendChild(post);

				oldcenter.replaceWith(newcenter);
			});
		return false;
	};

	var loadpostlist = function()
	{
		fetch('posts.txt')
			.then(function(response)
			{
				return response.text();
			})
			.then(function(text)
			{
				var oldcenter = document.getElementById('center');
				var newcenter = document.createElement('div');
				var header = document.createElement('h1');
				var list = document.createElement('ul');

				text.split('\n')
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
							loadpost(encodeURIComponent(file));
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
			});
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

