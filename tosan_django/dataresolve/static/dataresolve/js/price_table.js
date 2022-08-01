window.addEventListener("load", function () {
    (function ($) {
        console.log($);
        $(function () {
            const prod_name_str = $("#id_product_name_str");

            let id_index = 10000;


            let selected_values = {};

            function changeVars() {
                let text_shown = prod_name_str.next().find(".select2-selection__rendered").text().replace("×", "");
                const el_found = prod_name_str.find("option:contains(" + text_shown + ")");
                let attr_vals = [];
                if (el_found.attr("value") !== undefined && el_found.attr("value").length > 0) {
                    let firstPart = el_found.attr("value").split(",")[0];
                    let secondPart = el_found.attr("value").substring(firstPart.length + 2, el_found.attr("value").length - 1);
                    secondPart = secondPart.replaceAll("'", "\"");
                    attr_vals = JSON.parse(secondPart);
                    // console.log(secondPart);
                    if (!(text_shown in selected_values)) {
                        selected_values[text_shown] = [];
                        for (let i = 0; i < 10; i++)
                            selected_values[text_shown].push({});
                        for (let index = 0; index < 10; index++) {
                            let att_el = $("#id_name_att" + (index + 1).toString());
                            let attr_name = att_el.next().find(".select2-selection__rendered").text().replace("×", "");
                            let attr_id = att_el.find("option:contains(" + attr_name + ")").attr("value");

                            let att_val_el = $("#id_name_att_val" + (index + 1).toString());
                            let attr_val_name = att_val_el.find(":selected").text();
                            let attr_val_id = att_val_el.find(":selected").attr("value");
                            selected_values[text_shown][index] = {
                                "attr": {"id": attr_id, "name": attr_name},
                                "val": {"id": attr_val_id, "name": attr_val_name}
                            };
                        }
                    }
                    console.log("@@@", selected_values);
                    let index = 0;
                    for (; index < attr_vals.length; index++) {
                        let att_el = $("#id_name_att" + (index + 1).toString());
                        att_el.next().find(".select2-selection__rendered").text(attr_vals[index]['name']);
                        att_el.next().find(".select2-selection__rendered").attr("title", attr_vals[index]['name']);
                        att_el.empty();
                        att_el.append("<option value=\"" + attr_vals[index]['id'] + "\" data-select2-id=\"" + (id_index).toString() + "\"></option>");
                        id_index++;
                        att_el.parent().parent().parent().hide();
                        let att_val_el = $("#id_name_att_val" + (index + 1).toString());
                        att_val_el.empty();
                        att_val_el.parent().parent().parent().show();
                        att_val_el.parent().parent().find("label").text(attr_vals[index]['name']);
                        // console.log(attr_vals[index]['vals'], index);
                        for (let kk = 0; kk < Object.keys(attr_vals[index]['vals']).length; kk++) {
                            att_val_el.append("<option value=\"" + attr_vals[index]['vals'][kk]['id'] + "\">" + attr_vals[index]['vals'][kk]['name'] + "</option>")
                            id_index++;
                        }
                        if (text_shown in selected_values)
                            att_val_el.val(selected_values[text_shown][index]['val']['id']);
                    }
                    for (; index < 10; index++) {
                        let att_el = $("#id_name_att" + (index + 1).toString());
                        let att_val_el = $("#id_name_att_val" + (index + 1).toString());
                        att_el.parent().parent().parent().hide();
                        att_val_el.parent().parent().parent().hide();
                    }
                } else {
                    for (let index = 0; index < 10; index++) {
                        let att_el = $("#id_name_att" + (index + 1).toString());
                        let att_val_el = $("#id_name_att_val" + (index + 1).toString());
                        att_el.parent().parent().parent().hide();
                        att_val_el.parent().parent().parent().hide();
                    }
                }
            }

            changeVars();
            prod_name_str.next().on('DOMSubtreeModified', function () {
                changeVars();
            });


            for (let index = 0; index < 10; index++) {
                let att_val_el = $("#id_name_att_val" + (index + 1).toString());
                att_val_el.change(function () {
                    let text_shown = prod_name_str.next().find(".select2-selection__rendered").text().replace("×", "");
                    const el_found = prod_name_str.find("option:contains(" + text_shown + ")");
                    let attr_val_name = $(this).find(":selected").text();
                    let attr_val_id = $(this).find(":selected").attr("value");
                    if (el_found.attr("value") !== undefined && el_found.attr("value").length > 0) {
                        selected_values[text_shown][index]['val']['id'] = attr_val_id;
                        selected_values[text_shown][index]['val']['name'] = attr_val_name;
                    }
                    // console.log("Handler for .change() called.", index);
                });
            }
        });
    })(django.jQuery);
});