module Jekyll
  
    class RelatedPostsComponent < Liquid::Block
        
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
                  val = "[VARIABLE " + $key_value[0].delete('[') + " NOT FOUND]"
                  $end_array[$key] = val
                end
              end
    
          return $end_array
        end
     
     
        def getItemMarkup(title,  link, date, summary)
          content = ""

          itemOutput = "<div class='col-md-4 col-xs-12'>
                    <a class='card' href='#{link}' title='link to #{title}'>
                            <div class='card-content'>
                            <div class='post-date'>#{date}</div>
                            <h3>#{title}</h3>
                            #{content}
                            </div>
                            <div class='card-action'>
                              <div class='post-link'>
                                <svg  tabIndex='-1' focusable='false' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 39.42 58'>
                                <title>icons_glyphicon-chevron-right </title>
                                <path d='M194.68,226.36l-29,29-10.42-10.42,18.58-18.58-18.58-18.58,10.42-10.42Z' transform='translate(-155.26 -197.36)'/></svg>
                              </div>
                            </div>
                          </a>
                        </div>"

              return itemOutput
        end

        def render(context)
          contents = super
          # pipe param through liquid to make additional replacements possible
          content = Liquid::Template.parse(contents).render(context)
      
          #split the contents up into attributes to be used from the page
          $attributes = splitArray(content)

          item1_title = $attributes["item1_title"]
          item1_summary = $attributes["item1_summary"]
          item1_link = $attributes["item1_link"]
          item1_date = $attributes["item1_date"]
    
          item2_title = $attributes["item2_title"]
          item2_summary = $attributes["item2_summary"]
          item2_link = $attributes["item2_link"]
          item2_date = $attributes["item2_date"]
    
          item3_title = $attributes["item3_title"]
          item3_summary = $attributes["item3_summary"]
          item3_link = $attributes["item3_link"]
          item3_date = $attributes["item3_date"]
      
          output =  "<div class='row cards'>"

          if item1_link.index('VARI') == nil
            output += getItemMarkup(item1_title,item1_link, item1_date, item1_summary)
          end
          if item2_link.index('VARI')  == nil
            output += getItemMarkup(item2_title, item2_link, item2_date, item2_summary)
          end
          if item3_link.index('VARI') == nil
            output += getItemMarkup(item3_title, item3_link, item3_date, item3_summary)
          end
          
          output += "</div>"
      
          return output    
        end

      end
    end
  
    Liquid::Template.register_tag('relatedPosts', Jekyll::RelatedPostsComponent)
