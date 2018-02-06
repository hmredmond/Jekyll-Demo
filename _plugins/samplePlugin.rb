module Jekyll
  class SamplePluginBlock < Liquid::Block

    def initialize(tag_name, markup, tokens)
      @tag = markup
      super
    end

    def splitArray(content)
      
          $contentItems = content.chomp.split(']')
        
          $end_array = Hash.new 
        
            for item in $contentItems
              $key_value = item.chomp.split('=')
              $key = $key_value[0].delete('[').strip
        
              if($key_value[1])
                
                $kval = $key_value[1]
                $end_array[$key] = $kval
              else
                val = false
                $end_array[$key] = val
              end
            end
  
        return $end_array
      end

      def endChar?(lookAhead)
        lookAhead =~ /[;]/
      end

    def render(context)
      contents = super

      # pipe param through liquid to make additional replacements possible
      content = Liquid::Template.parse(contents).render(context)
      
      #split the contents up into attributes to be used from the page
      $attributes = splitArray(content)

      title = $attributes['headertitle']
      subtext =$attributes['headersubtext']
      
      output = "<section class='row header-hero-item'>
                    <div class='section-container'>
                        <div class='row'>
                          <div class='col-xs-12 col-sm-10 col-md-8 header-hero-title'>
                                <h1>#{title}</h1> 
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-xs-12 col-sm-10 col-md-5'>
                                <p class='subtitle'>#{subtext}</p>
                          </div>
                        </div>
                    </div>
                </section>"

      return output  

    end
  end
end

# Register your component with Liquid
Liquid::Template.register_tag("samplePlugin", Jekyll::SamplePluginBlock)
