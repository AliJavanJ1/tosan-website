window.addEventListener("load", function () {
    (function ($) {
        console.log($);
        $(function () {
            var ulItem = $('#id_attrs').next().find("ul");
            var remove_all_attr = $('#id_attrs').next().find(".select2-selection__clear");
            remove_all_attr.hide();
            console.log(ulItem);


            let filled_fieldsets = {}
            let deleted_fieldsets = {}
            let last_ul_els = []
            let total_uls = []
            let checker = (arr, target) => target.every(v => arr.includes(v));

            // let last_sort_by = "";

            function toggleVerified(value) {
                var remove_all_attr = $('#id_attrs').next().find(".select2-selection__clear");
                remove_all_attr.hide();
                let children = value.children()
                let lenn = children.length - 2;
                let ul_els = [];
                for (let index = 1; index <= lenn; index++) {
                    ul_els.push(children.eq(index).text().replace("×", ""));
                    if (!total_uls.includes(ul_els[index - 1])) {
                        total_uls.push(ul_els[index - 1]);
                    }

                }
                if (
                    ul_els.length >= Object.keys(filled_fieldsets).length - 1 && ul_els !== last_ul_els &&
                    (last_ul_els.length === 0 || checker(last_ul_els, ul_els) || checker(ul_els, last_ul_els))
                ) {
                    let attrs_chose = $('#id_attrs').next().find("ul").children();
                    let attrs_chose_text = [];
                    for (let index = 0; index < attrs_chose.length; index++) {
                        if (attrs_chose.eq(index).attr("class") === "select2-selection__choice") {
                            attrs_chose_text.push(attrs_chose.eq(index).text().replace("×", ""));
                        }
                    }
                    let id_sort_by_attr = $("#id_sort_by_attr");
                    let last_sort_by = id_sort_by_attr.val();
                    let last_sort_by_exists = attrs_chose_text.includes(last_sort_by);
                    id_sort_by_attr.empty();
                    id_sort_by_attr.append("<option value=\"\">---------</option>")
                    for (let index = 0; index < attrs_chose_text.length; index++) {
                        id_sort_by_attr.append("<option value=\"" + attrs_chose_text[index] + "\">" + attrs_chose_text[index] + "</option>")
                    }
                    if (last_sort_by_exists) {
                        id_sort_by_attr.val(last_sort_by);
                    } else {
                        id_sort_by_attr.val("");
                    }

                    last_ul_els = [...ul_els];
                    for (let index = 0; index < 10; index++) {
                        let base_class_name = "." + (index - 1).toString() + "-attr";
                        if (base_class_name in filled_fieldsets) {
                            if (!(ul_els.includes(filled_fieldsets[base_class_name]))) {
                                let vars_selected = $(base_class_name).find("select");
                                let vars_selected_list = []
                                for (let vars_selected_index = 0; vars_selected_index < vars_selected.children().length; vars_selected_index++) {
                                    vars_selected_list.push(vars_selected.children().eq(vars_selected_index));
                                }
                                for (let vars_selected_index = vars_selected.children().length - 1; vars_selected_index >= 0; vars_selected_index--) {
                                    vars_selected.children().eq(vars_selected_index).remove();
                                }
                                deleted_fieldsets[filled_fieldsets[base_class_name]] = vars_selected_list;
                                vars_selected.empty();
                                delete filled_fieldsets[base_class_name];
                                $(base_class_name + " h2").text("");
                                $(base_class_name).hide();
                            } else {
                                ul_els = ul_els.filter(function (item) {
                                    return item !== filled_fieldsets[base_class_name]
                                })
                            }
                        }
                    }
                    // console.log("222 !@#!@# ", last_ul_els, ul_els, filled_fieldsets, deleted_fieldsets);
                    let ul_els_index = 0;
                    for (let index = 0; index < 10 && ul_els_index < ul_els.length; index++) {
                        let base_class_name = "." + index.toString() + "-attr";
                        if (!(base_class_name in filled_fieldsets)) {
                            if (ul_els[ul_els_index] in deleted_fieldsets) {
                                let vars_selected = $(base_class_name).find("select");
                                vars_selected.empty();
                                for (let vars_selected_index = 0; vars_selected_index <
                                deleted_fieldsets[ul_els[ul_els_index]].length; vars_selected_index++) {
                                    vars_selected.append(deleted_fieldsets[ul_els[ul_els_index]][vars_selected_index]);
                                }
                            }
                            filled_fieldsets[base_class_name] = ul_els[ul_els_index];
                            $(base_class_name).show();
                            $(base_class_name + " h2").text(ul_els[ul_els_index]);
                            ul_els_index++;
                        }
                    }
                    // console.log("333 !@#!@# ", last_ul_els, ul_els, filled_fieldsets, deleted_fieldsets);
                    for (let index = 0; index < 10; index++) {
                        let base_class_name = "." + index.toString() + "-attr";
                        if (!(base_class_name in filled_fieldsets)) {
                            $(base_class_name).hide();
                        }
                    }

                    let ul_els_sored = [...last_ul_els];
                    ul_els_sored.sort();
                    let els_dict = {};
                    for (let index = 0; index < ul_els_sored.length; index++) {
                        els_dict[ul_els_sored[index]] = {"options": [], "lis": []};
                    }
                    for (let index = 0; index < 10; index++) {
                        let base_class_name = "." + index.toString() + "-attr";
                        let fieldset_header = $(base_class_name + " h2").text();
                        if (fieldset_header in els_dict) {
                            let fieldset_options = $(base_class_name).find("select").children();
                            let fieldset_lis = $(base_class_name).find("ul").children();
                            for (let option_indexx = fieldset_options.length - 1; option_indexx >= 0; option_indexx--) {
                                els_dict[fieldset_header]['options'].push(fieldset_options.eq(option_indexx));
                            }
                            $(base_class_name).find("select").empty();
                            for (let lis_index = fieldset_lis.length - 1; lis_index >= 0; lis_index--) {
                                if (fieldset_lis.eq(lis_index).attr("class") === "select2-selection__choice") {
                                    els_dict[fieldset_header]['lis'].push(fieldset_lis.eq(lis_index));
                                    fieldset_lis.eq(lis_index).remove();
                                }
                            }
                        }
                    }
                    // console.log("$$$$444", els_dict);

                    let el_index = 0;
                    for (let el_name in els_dict) {
                        // console.log(el_name);
                        let base_class_name = "." + el_index.toString() + "-attr";
                        filled_fieldsets[base_class_name] = el_name;
                        $(base_class_name).show();
                        $(base_class_name + " h2").text(el_name);
                        let fieldset_options = $(base_class_name).find("select");
                        let fieldset_lis = $(base_class_name).find("ul");
                        let last_li_child = fieldset_lis.children().eq(fieldset_lis.children().length - 1);
                        fieldset_options.empty();
                        // fieldset_lis.empty();
                        for (let option_index = els_dict[el_name]['options'].length - 1; option_index >= 0; option_index--) {
                            fieldset_options.append(els_dict[el_name]['options'][option_index]);
                        }
                        for (let li_index = els_dict[el_name]['lis'].length - 1; li_index >= 0; li_index--) {
                            last_li_child.before(els_dict[el_name]['lis'][li_index]);
                        }
                        el_index++;
                    }
                    for (; el_index < 10; el_index++) {
                        let base_class_name = "." + el_index.toString() + "-attr";
                        if (base_class_name in filled_fieldsets) {
                            delete filled_fieldsets[base_class_name];
                            $(base_class_name).hide();
                        }
                    }
                }
            }

            toggleVerified(ulItem);
            $('#id_attrs').change(function () {
                toggleVerified(ulItem);
            });
            // ulItem.on('DOMSubtreeModified', );
        });
    })(django.jQuery);
});