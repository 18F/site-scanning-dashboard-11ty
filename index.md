---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, _includes/home.

layout: layouts/base.njk
---
{% assign domain = scanner.domainScanList.0.domain %}

### Scan Results for {{ domain  }} 
#### {{ scanner.url }}:

{% for domain in scanner.domainScanList %}
#### {{ domain.scantype }}
<dl>
  {% for item in domain.data %}
  <dt><strong>{{ item.0 }}</strong></dt>
  <dd>{{ item.1|extract_values }}</dd> 
  {% endfor %}
</dl>
{% endfor %}


<a href="{{ scanner.url }}">Click here</a> to go to the main searchable site.
