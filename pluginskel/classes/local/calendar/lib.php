defined('MOODLE_INTERNAL') || die();

function local_calendar_custom_extend_navigation(global_navigation $navigation) {
    $url = new moodle_url('/local/calendar_custom/view.php');
    $node = navigation_node::create('Custom Calendar', $url, navigation_node::TYPE_CUSTOM, 'custom_calendar', 'custom_calendar', new pix_icon('i/calendar', ''));
    $navigation->add_node($node);
    return true;
}
