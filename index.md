---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, _includes/home.

layout: layouts/base.njk
---
{% assign domain = scanner.domainScans.0.domain %}

<div style="overflow:auto">
<table class="usa-table">
<thead>
<tr>
<th>Domain</th>
{% for s in scanner.desiredScans   %}
  <th>{{ s }}</th>
{% endfor %}
</tr>
</thead>
{% for d in scanner.domainScans %}
<tr>
<th><a href="{{ d.url }}">{{ d.domain }}</a></th>
{% if d.domainData.0  %}
  {% for scan in d.domainData %}
  {% if scanner.desiredScans contains scan.scantype %}
  <td>
  {% capture includepath %}./scans/{{ scan.scantype }}.html{% endcapture %}
  {% include includepath scan %}
  </td>
  {% endif %}
  {% endfor %}
{% else %}
  <td colspan="{{ scanner.desiredScans.length }}">No data retrieved</td>
{% endif %}
</tr>
{% endfor %}
</table>
</div>

<hr>
<a href="{{ scanner.url }}">Click here</a> to go to the main searchable site.

### All available scans:
<ul>
{% for s in scanner.availscans %}
  <li>{{ s }}</li>
{% endfor %}
</ul>