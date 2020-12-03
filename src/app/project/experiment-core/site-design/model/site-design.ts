export class SiteDesign {
  constructor(
    public expSiteId: string,
    public experimentalDesignId: string,
    public crd_variable: string,
    public rcbd_variable: string,
    public fcrd_variable: string,
    public frcbd_variable: string,


    public crd_length_p: string,
    public crd_length_unit_p: string,
    public crd_width_p: string,
    public crd_width_unit_p: string,

    public crd_length_f: string,
    public crd_length_unit_f: string,
    public crd_width_f: string,
    public crd_width_unit_f: string,

    public crd_diameter: string,
    public crd_diameter_unit: string,
    public crd_depth: string,
    public crd_depth_unit: string,


    public rcbd_length_p: string,
    public rcbd_length_unit_p: string,
    public rcbd_width_p: string,
    public rcbd_width_unit_p: string,

    public rcbd_length_f: string,
    public rcbd_length_unit_f: string,
    public rcbd_width_f: string,
    public rcbd_width_unit_f: string,

    public rcbd_diameter: string,
    public rcbd_diameter_unit: string,
    public rcbd_depth: string,
    public rcbd_depth_unit: string,


    public fcrd_length_p: string,
    public fcrd_length_unit_p: string,
    public fcrd_width_p: string,
    public fcrd_width_unit_p: string,

    public fcrd_length_f: string,
    public fcrd_length_unit_f: string,
    public fcrd_width_f: string,
    public fcrd_width_unit_f: string,

    public fcrd_diameter: string,
    public fcrd_diameter_unit: string,
    public fcrd_depth: string,
    public fcrd_depth_unit: string,


    public frcbd_length_p: string,
    public frcbd_length_unit_p: string,
    public frcbd_width_p: string,
    public frcbd_width_unit_p: string,

    public frcbd_length_f: string,
    public frcbd_length_unit_f: string,
    public frcbd_width_f: string,
    public frcbd_width_unit_f: string,

    public frcbd_diameter: string,
    public frcbd_diameter_unit: string,
    public frcbd_depth: string,
    public frcbd_depth_unit: string,


    public sprcbd_main_exp_plot_length: string,
    public sprcbd_main_exp_plot_length_unit: string,
    public sprcbd_main_exp_plot_width: string,
    public sprcbd_main_exp_plot_width_unit: string,
    public sprcbd_sub_exp_plot_length: string,
    public sprcbd_sub_exp_plot_length_unit: string,
    public sprcbd_sub_exp_plot_width: string,
    public sprcbd_sub_exp_plot_width_unit: string,

    public spsp_main_exp_plot_length: string,
    public spsp_main_exp_plot_length_unit: string,
    public spsp_main_exp_plot_width: string,
    public spsp_main_exp_plot_width_unit: string,
    public spsp_sub_exp_plot_length: string,
    public spsp_sub_exp_plot_length_unit: string,
    public spsp_sub_exp_plot_width: string,
    public spsp_sub_exp_plot_width_unit: string,
    public spsp_subsub_exp_plot_length: string,
    public spsp_subsub_exp_plot_length_unit: string,
    public spsp_subsub_exp_plot_width: string,
    public spsp_subsub_exp_plot_width_unit: string,

    public strip_main_exp_plot_length: string,
    public strip_main_exp_plot_length_unit: string,
    public strip_main_exp_plot_width: string,
    public strip_main_exp_plot_width_unit: string,
    public strip_sub_exp_plot_length: string,
    public strip_sub_exp_plot_length_unit: string,
    public strip_sub_exp_plot_width: string,
    public strip_sub_exp_plot_width_unit: string,

    public crd_nrep: string,
    public crd_ntrt: string,
    public rcbd_nblock: string,
    public rcbd_ntrt: string,
    public fcrd_nrep: string,
    public frcbd_nblock: string,
    public sprcbd_nblock: string,
    public spsp_nblock: string,
    public strip_nblock: string,
    public status: string,
    public expDesignId?: number,
  ) { }
}
