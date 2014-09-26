module ApplicationHelper

	def icon(font)
		"<span class='glyphicon glyphicon-#{font}'></span>".html_safe
	end

end
