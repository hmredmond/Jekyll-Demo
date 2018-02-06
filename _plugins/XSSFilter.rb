module Jekyll
  module RegexXSSFilter

    #function to remove XSS attempts from element attribute text
      def regexremoveXSSFromElementAttr(input )
          regex = "^((?:^.*\/)?)([^\/'\" ;<>]+)"
          badCharRegex = "[{}<>].*$"
          if( input != nil )
            input.to_s.gsub(Regexp.new(badCharRegex), '').match(regex)[0]
          end
      end

       #function to remove XSS attempts from page body text
    def regexremoveXSSFromBodyText(input )
      if( input != nil )
        output = input
        re = /(?i)(<script(.|\n)*?<\/script>|onload=|onclick=|alert\((.|\n)*?\)|onmouseover|javascript:|onerror=|onfocus=|ondblclick=|onkeyup=|onkeydown=|onabort=|style=)/
        $matches = input.scan(re).size

        while $matches > 0  do
          output = output.to_s.gsub(Regexp.new(re), '') 
          $matches = output.scan(re).size
        end
        input = output
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::RegexXSSFilter)
